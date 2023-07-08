import React from "react";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51NQZX9I7MuNssT8a3byrY79NB4OzlmIlBAy8EG724M85KOWMGwLSmGS3ex4wKeQOIVK9AE2gc7cnJu6QeytFNgdq000Ppz5es5",
  {
    apiVersion: "2022-11-15",
  }
);

const prices: { [key: string]: any } = {
  pencil: {
    s12cm_x_12cm: 5,
    s24cm_x_24cm: 10,
    s50cm_x_50cm: 20,
  },
  aquarelle: {
    s12cm_x_12cm: 10,
    s24cm_x_24cm: 20,
    s50cm_x_50cm: 35,
  },
  marker: {
    s12cm_x_12cm: 7,
    s24cm_x_24cm: 14,
    s50cm_x_50cm: 25,
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

async function payment(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: "https://www.jesu-arte.cl",
        cancel_url: "https://www.jesu-arte.cl/contactus",
        line_items: Object.keys(req.body).map((item: any) => {
          const tech = req.body[item].technique;
          const size = req.body[item].size;
          const price = prices[tech][size];
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: `${
                  tech.substr(0, 1).toUpperCase() + tech.substr(1)
                } ${size.substr(1).replaceAll("_", " ")}`,
              },
              unit_amount: Number(price) * 100,
            },
            quantity: 1,
          };
        }),
      });
      res.json({ url: session.url });
    } catch (e) {
      res.status(500).json({ error: e});
    }
  }
}

export default allowCors(payment);
// export default payment
