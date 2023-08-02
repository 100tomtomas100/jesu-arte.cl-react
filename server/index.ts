const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));


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

router.post("/contact", (req, res) => {
  console.log(req.body)
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const mail = {
    from: `Formulario de contacto <contacto@jesu-arte.cl>`,
    to: "jesu.arte.cl@gmail.com",
    subject: `Formulario de contacto de ${name}`,
    html: `<p>Nombre: ${name}</p>
           <p>Correo: ${email}</p>
           <p>Mensaje: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "Algo salió mal...intenta nuevamente!" });
    } else {
      res.json({ status: "Tus datos fueron enviados de manera exitosa!" });
    }
  });
});

