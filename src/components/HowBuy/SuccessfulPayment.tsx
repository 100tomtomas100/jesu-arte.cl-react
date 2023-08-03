import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../../assets/styles/SuccessfulPayment.module.scss";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SuccessfulPayment = () => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const params = new URLSearchParams(window.location.href);
  let { session_id } = useParams();

  useEffect(() => {
    console.log(session_id);
    (async () => {
      try {
        // await fetch(
        //   `http://localhost:3001/api/payment?session_id=${session_id}`,
        //   {
        //tttrrrrr
        const l = 0;
        await fetch(`https://www.jesu-arte.cl/api/payment?session_id=${session_id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            setEmail(data.email);
            setName(data.name);
          });
      } catch (err: any) {
        console.error(err.error);
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={styles.loading}
        style={{ display: name ? "none" : "block" }}
      >
        <AiOutlineLoading3Quarters />
      </div>
      <div className={styles.text} style={{ display: name ? "block" : "none" }}>
        <p>Thank you for your purchase</p>
        <p className={styles.customerDetails}>{`${name}!`}</p>
        <p> The verification email was sent to</p>
        <p className={styles.customerDetails}>{`${email}`}</p>
      </div>
    </div>
  );
};

export default SuccessfulPayment;
