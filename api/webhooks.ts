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
      "sk_test_51NQZX9I7MuNssT8a3byrY79NB4OzlmIlBAy8EG724M85KOWMGwLSmGS3ex4wKeQOIVK9AE2gc7cnJu6QeytFNgdq000Ppz5es5",
      { apiVersion: "2022-11-15" }
    ); // version null sets the most recent API version

    try {
      const requestBuffer = await buffer(req);
      const signature = req.headers["stripe-signature"] as string;

      event = stripe.webhooks.constructEvent(
        requestBuffer.toString(), // Stringify the request for the Stripe library
        signature,
        "whsec_OhdbKaqL8KB6dCVU4fgT2d049oglhKLy"
        //"whsec_f52710d6bd706808f084fdfa36984a04b4416d580d7b35651cf2dac764ad29be" // you get this secret when you register a new webhook endpoint
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
        const to = "jesu.arte.cl@gmail.com";
        const from = `New order from ${name} <contacto@jesu-arte.cl>`;
        const subject = `There is a new order from ${name}`;
        const date = new Date(event.data.object.expires_at * 1000);

        try {
          await fetch(
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
          console.log(e)
          res.status(500).send(`Webhook error: ${e}`);
        }

        // //send thank you email to customer
        const custTo = email;
        const custFrom = `Thank you for your order <contacto@jesu-arte.cl>`;
        const custSub = "Jesu Arte Order";

        try {
          console.log("second try");
          await fetch(
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
          });
        } catch (e) {
          // res.status(500).send(`Webhook error: ${e}`);
        }
        console.log("end")
        res.status(200);
        break;
      }
      case "checkout.session.expired": {
        //remove temporary images from database
        deleteImageFromFirebase(user);
        res.status(200);
        break;
      }
    }
  }
}
