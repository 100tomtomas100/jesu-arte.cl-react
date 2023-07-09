import { buffer } from "micro";
import Stripe from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export const config = {
  api: {
    bodyParser: false,
  },
};

const allowCors =
  (fn: any) => async (req: VercelRequest, res: VercelResponse) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }
    return await fn(req, res);
  };

async function handler(req: VercelRequest, res: VercelResponse) {
  // check the request method and ensure you only accept POST requests.
  if (req.method === "POST") {
    let event: { [key: string]: any };
    try {
      const requestBuffer = await buffer(req);
      const signature = req.headers["stripe-signature"] as string;
      const stripe = new Stripe(
        "sk_test_51NQZX9I7MuNssT8a3byrY79NB4OzlmIlBAy8EG724M85KOWMGwLSmGS3ex4wKeQOIVK9AE2gc7cnJu6QeytFNgdq000Ppz5es5",
        { apiVersion: "2022-11-15" }
      ); // version null sets the most recent API version
      event = stripe.webhooks.constructEvent(
        requestBuffer.toString(), // Stringify the request for the Stripe library
        signature,
        // "whsec_f52710d6bd706808f084fdfa36984a04b4416d580d7b35651cf2dac764ad29be" // you get this secret when you register a new webhook endpoint
        "whsec_4KTiw6WXJTA2Uxn6UhtipDm7LbIHGrC4"
      );
      // you can now safely work with the request. The event returned is the parsed request body.
        // res.send(200);
    } catch (error) {
      res.status(400).send(`Webhook error: ${error}`);
      return;
    }
    switch (event.type) {
      case "payment_intent.succeeded":
        console.log("success2");
        // await fetch("http://localhost:3001/api/submitForm", {
        await fetch("https://www.jesu-arte.cl/api/submitForm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            name: "tiptoptip",
            email: "someemail@gmail.com",
            message: "tralalalalalala",
          }),
        });
        
    }
    res.send(200);
    //   console.log(event.type)
  }
}

export default handler;