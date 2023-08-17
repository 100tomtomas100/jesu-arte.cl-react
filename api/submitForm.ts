import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from "nodemailer";

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

async function submitForm(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const to = req.body.to;
    const from = req.body.from;
    const subject = req.body.subject;
    const attachments = req.body.attachments || [];
    const toCustomer = req.body.toCustomer;

    const contactEmail = nodemailer.createTransport({
      // service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await new Promise((resolve, reject) => {
      contactEmail.verify((error, success) => {
        if (error) {
          console.log(error);
          reject(error);
          res.status(500).send(`Nodemailer error: ${error}`);
        } else {
          console.log("Ready to Send");
          resolve(success);
        }
      });
    });

    const mailInfo = {
      from: from,
      to: to,
      subject: subject,
      html: toCustomer
        ? `<p>${message}</p>`
        : `<p>Nombre: ${name}</p>
             <p>Correo: ${email}</p>
             <p>Mensaje: ${message}</p>`,
      attachments: attachments,
    };

    await new Promise((resolve, reject) => {
      contactEmail.sendMail(mailInfo, (error, info) => {
        if (error) {
          console.log(error);
          reject(error);
          res.json({ status: "Algo salió mal...intenta nuevamente!" });
          res.status(500).send(`Nodemailer error: ${error}`);
        } else {
          console.log(info);
          resolve(info);
          res.json({ status: "Tus datos fueron enviados de manera exitosa!" });
          res.status(200);
        }
      });
    });
  }
}

export default process.env.NODE_ENV === "development" ?
  allowCors(submitForm) :
  submitForm;