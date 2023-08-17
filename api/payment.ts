import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

const stripe = new Stripe(
  process.env.STRIPE_TEST_KEY as string,
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
        success_url:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/how-buy/successful-payment/{CHECKOUT_SESSION_ID}"
            : "https://www.jesu-arte.cl/how-buy/successful-payment/{CHECKOUT_SESSION_ID}",
        cancel_url:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/how-buy/payment-canceled"
            : "https://www.jesu-arte.cl/how-buy/payment-canceled",
        line_items: Object.keys(req.body.shoppingCart).map((item: any) => {
          const tech = req.body.shoppingCart[item].technique;
          const size = req.body.shoppingCart[item].size;
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
        metadata: {
          user: req.body.user,
        },
        shipping_address_collection: {
          allowed_countries: ["CL", "AR"],
        },
      });
      res.json({ url: session.url });
    } catch (e) {
      res.status(500).json({ error: e });
    }
    //get the email and name of the customer for the successful payment page
  } else if (req.method === "GET") {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id as string
    );
    const email = session.customer_details?.email;
    const name = session.customer_details?.name;
    res.json({ name: name, email: email });
  }
}

export default process.env.NODE_ENV === "development"
  ? allowCors(payment)
  : payment;
