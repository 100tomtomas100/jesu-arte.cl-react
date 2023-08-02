import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from "nodemailer";
 
export default function submitForm(req: VercelRequest, res: VercelResponse) {
  const contactEmail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  contactEmail.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready to Send");
    }
  });


  if (req.method === "POST") {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const attachments = req.body.attachments
    const mail = {
      from: `Formulario de contacto <contacto@jesu-arte.cl>`,
      to: "jesu.arte.cl@gmail.com",
      subject: `Formulario de contacto de ${name}`,
      html: `<p>Nombre: ${name}</p>
             <p>Correo: ${email}</p>
             <p>Mensaje: ${message}</p>`,
      attachments: attachments
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "Algo salió mal...intenta nuevamente!" });
      } else {
        res.json({ status: "Tus datos fueron enviados de manera exitosa!" });
      }
    });
  }
}