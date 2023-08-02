import { buffer } from "micro";
import Stripe from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { storage } from "../src/utils/firebase.js";
import { ref, uploadString, getDownloadURL, StorageReference } from "firebase/storage";

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
        "whsec_f52710d6bd706808f084fdfa36984a04b4416d580d7b35651cf2dac764ad29be" // you get this secret when you register a new webhook endpoint
        // "whsec_4KTiw6WXJTA2Uxn6UhtipDm7LbIHGrC4"
      );
      // you can now safely work with the request. The event returned is the parsed request body.
      // res.send(200);
    } catch (error) {
      res.status(400).send(`Webhook error: ${error}`);
      return;
    }
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

        //get image urls
        let imgUrls: {}[] = [];
        const user = event.data.object.metadata.user;
        // for (let i = 0; (purchasedItems as string[]).length > i; i++){
        for (let i = 0; 3 > i; i++) {
          const myRef = ref(storage, `temp/${user}/${i}.png`);
          const downloadUrl = await getDownloadURL(myRef);
          imgUrls.push({filename: `${i+1}.png`, path: downloadUrl})
        }

        console.log(imgUrls)
        

        //lineItems?.data[0].description
        // console.log(event.data.object.customer_details);
        const email = event.data.object.customer_details.email;
        const name = event.data.object.customer_details.name;
        const date = new Date(event.data.object.expires_at * 1000);
        // console.log(event.data.object.expires_at, date);
        // await fetch("http://localhost:3001/api/submitForm", {
          await fetch("https://www.jesu-arte.cl/api/submitForm", {
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
            attachments: imgUrls
          }),
        });
        // console.dir(lineItems, { depth: null });
        break;
      }
      case "checkout.session.expired": {
        //remove image from database
      }
    }
    res.send(200);
    //   console.log(event.type)
  }
}
