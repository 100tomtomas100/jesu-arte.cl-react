import { buffer } from "micro";
import Stripe from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { storage } from "../src/utils/firebase.js";
import { ref, getDownloadURL } from "firebase/storage";
import bucket from "../src/utils/firebaseAdmin.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // check the request method and ensure you only accept POST requests.
  if (req.method === "POST") {
    let event: { [key: string]: any };
    const stripe = new Stripe(
    process.env.STRIPE_TEST_KEY as string,
      { apiVersion: "2022-11-15" }
    ); // version null sets the most recent API version

    try {
      const requestBuffer = await buffer(req);
      const signature = req.headers["stripe-signature"] as string;

      event = stripe.webhooks.constructEvent(
        requestBuffer.toString(), // Stringify the request for the Stripe library
        signature,
        process.env.STRIPE_SIGNATURE as string
      );
      // you can now safely work with the request. The event returned is the parsed request body.
    } catch (error) {
      res.status(400).send(`Webhook error: ${error}`);
      return;
    }

    //remove images from firebase
    const deleteImageFromFirebase = async (user: string) => {
      await bucket.deleteFiles({ prefix: `temp/${user}` });
    };

    const user = event.data.object.metadata.user;

    switch (event.type) {
      case "checkout.session.completed": {
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
          event.data.object.id,
          {
            expand: ["line_items"],
          }
        );
        const lineItems = sessionWithLineItems.line_items;
        const purchasedItems = lineItems?.data.map(
          (item: { [key: string]: any }) => {
            return item.description;
          }
        );

        //send email to own email about new order
        let imgUrls: { [key: string]: any }[] = [];
        for (let i = 0; (purchasedItems as string[]).length > i; i++) {
          const myRef = ref(storage, `temp/${user}/${i}.png`);
          const downloadUrl = await getDownloadURL(myRef);
          imgUrls.push({ filename: `${i + 1}.png`, path: downloadUrl });
        }
        const email = event.data.object.customer_details.email;
        const name = event.data.object.customer_details.name;
        const to = `${process.env.EMAIL_USER}`;
        const from = `New order from ${name} <${process.env.EMAIL_WEB}>`;
        const subject = `There is a new order from ${name}`;
        const date = new Date(event.data.object.expires_at * 1000);

        try {
          fetch(
            process.env.NODE_ENV === "development"
              ? "http://localhost:3001/api/submitForm"
              : "https://www.jesu-arte.cl/api/submitForm",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
              body: JSON.stringify({
                name: `${name}`,
                email: `${email}`,
                message: `There is a new order:
            ${purchasedItems?.map((item: string, i: number) => {
              return ` ${i + 1}: ${item}`;
            })}
           `,
                attachments: imgUrls,
                to: to,
                from: from,
                subject: subject,
                date: date,
                toCustomer: false,
              }),
            }
          ).then(() => {
            //remove temporary images from firebase
            deleteImageFromFirebase(user);
          });
          res.status(200);
        } catch (e) {
          console.log(e);
          res.status(500).send(`Webhook error: ${e}`);
        }

        // send thank you email to customer
        const custTo = email;
        const custFrom = `Thank you for your order <contacto@jesu-arte.cl>`;
        const custSub = "Jesu Arte Order";

        try {
          fetch(
            process.env.NODE_ENV === "development"
              ? "http://localhost:3001/api/submitForm"
              : "https://www.jesu-arte.cl/api/submitForm",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
              body: JSON.stringify({
                message: `Thank you for your order!!`,
                to: custTo,
                from: custFrom,
                subject: custSub,
                toCustomer: true,
              }),
            }
          );
        } catch (e) {
          res.status(500).send(`Webhook error: ${e}`);
        }
        break;
      }
      case "checkout.session.expired": {
        //remove temporary images from database
        deleteImageFromFirebase(user);
        break;
      }
    }
    //send response that request was received
    res.json({ received: true });
  }
}
