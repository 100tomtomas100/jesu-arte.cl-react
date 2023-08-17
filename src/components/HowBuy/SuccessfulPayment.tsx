import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../../assets/styles/SuccessfulPayment.module.scss";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useInactiveScreenStore } from "../../hooks/useStore";

const SuccessfulPayment = () => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const params = new URLSearchParams(window.location.href);
  let { session_id } = useParams();

  //store
  const inactiveScreen = useInactiveScreenStore((state) => state.active);
  const setInactiveScreen = useInactiveScreenStore((state) => state.setActive);

  useEffect(() => {
    //set inactive screen
    setInactiveScreen(true);
    // localStorage.removeItem("shoppingCart");
    (async () => {
      try {
        await fetch(
          process.env.NODE_ENV === "development"
            ? `http://localhost:3001/api/payment?session_id=${session_id}`
            : `https://www.jesu-arte.cl/api/payment?session_id=${session_id}`,
          {
            // await fetch(`https://www.jesu-arte.cl/api/payment?session_id=${session_id}`, {
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
            setEmail(data.email);
            setName(data.name);
          });
        //remove inactive screen
        setInactiveScreen(false);
      } catch (err: any) {
        console.error(err.error);
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
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

