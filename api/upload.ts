import type { VercelRequest, VercelResponse } from "@vercel/node";
// import { storage } from "../src/utils/firebase";
import { IncomingForm } from "formidable";
import { ref, uploadString, uploadBytes } from "firebase/storage";

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

async function upload(req: VercelRequest, res: VercelResponse) {
    if (req.method === "POST") {
      console.log("er")
    console.log(req.body.image);
    // res.status(200).end();
  }
}

export default process.env.NODE_ENV === "development" ? allowCors(upload) :
upload;
