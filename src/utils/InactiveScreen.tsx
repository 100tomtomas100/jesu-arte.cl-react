import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styles from "../assets/styles/InactiveScreen.module.scss";

const InactiveScreen = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loading}>
        <AiOutlineLoading3Quarters />
      </div>
    </div>
  );
};

export default InactiveScreen;
