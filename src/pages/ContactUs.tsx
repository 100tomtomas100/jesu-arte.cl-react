import React, { useState } from "react";
import styles from "../assets/styles/ContactUs.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import Email from "../components/Contact-us/Email";

type Inputs = {
  name: string;
  email: string;
  message: string;
};

const ContactUs = () => {
  const [formStatus, setFormStatus] = useState<string>("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setFormStatus("Enviando...");
    console.log(data);
    let response = await fetch("https://www.jesu-arte.cl/api/submitForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
    let result = await response.json();
    setFormStatus(result.status);
  };

  return (
    <div>
      <div className={styles.container}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          style={{ display: `${formStatus ? "none" : "grid"}` }}
        >
          <div className={styles.inputContainer}>
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              type="text"
              {...register("name", { required: true, maxLength: 100 })}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <p className={styles.inputError} role="alert">
                Por favor ingresa tu nombre!
              </p>
            )}
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="email">Correo</label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: true,
                maxLength: 100,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Por favor ingresa un correo válido!",
                },
              })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email?.type === "required" && (
              <p className={styles.inputError} role="alert">
                Por favor ingresa tu correo!
              </p>
            )}
            {errors.email?.type === "pattern" && (
              <p className={styles.inputError} role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              className={styles.textArea}
              {...register("message", {
                required: true,
                maxLength: 2000,
                minLength: 20,
              })}
              aria-invalid={errors.name ? "true" : "false"}
            ></textarea>
            {errors.message?.type === "required" && (
              <p className={styles.inputError} role="alert">
                Por favor ingresa un mensaje!
              </p>
            )}
            {errors.message?.type === "maxLength" && (
              <p className={styles.inputError} role="alert">
                El mensaje debe ser de mínimo 20 y máximo 200 caracteres!
              </p>
            )}
            {errors.message?.type === "minLength" && (
              <p className={styles.inputError} role="alert">
                El mensaje debe ser de mínimo 20 y máximo 200 caracteres!
              </p>
            )}
          </div>
          <div className={styles.buttonWrapper}>
            <button type="submit">Enviar</button>
          </div>
        </form>
        <div
          className={styles.formDeliveryMsgContainer}
          style={{ display: `${formStatus ? "block" : "none"}` }}
        >
          <div className={styles.formDeliveryMsg}>
            <h2>{formStatus}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
