import React, { useEffect } from "react";
import styles from "../assets/styles/HowBuy.module.scss";
import BuyForm from "../components/HowBuy/BuyForm";
import { useBuyStore } from "../hooks/useStore";

const HowBuy = () => {
  //store
  const shoppingCart = useBuyStore((state) => state.shoppingCart);
    const setShoppingCart = useBuyStore((state) => state.setShoppingCart);
    
    useEffect(() => {
        console.log(shoppingCart)
    },[shoppingCart])
  return (
    <div className={styles.container}>
      <BuyForm />
    </div>
  );
};

export default HowBuy;
