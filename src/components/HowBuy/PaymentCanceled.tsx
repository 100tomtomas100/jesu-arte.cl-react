import React from "react";
import styles from "../../assets/styles/PaymentCanceled.module.scss";

const PaymentCanceled = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <p>Your payment</p>
        <p>has been</p>
        <p>canceled!</p>
      </div>
    </div>
  );
};

export default PaymentCanceled;
