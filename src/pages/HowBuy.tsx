import React, { useContext, useEffect } from "react";
import styles from "../assets/styles/HowBuy.module.scss";
import BuyForm from "../components/HowBuy/BuyForm";
import { useBuyStore } from "../hooks/useStore";
import ShoppingCart from "../components/HowBuy/ShoppingCart";
import cartImg from "../assets/images/shopping-cart.png";
import AnimContext from "../context/AnimContext";

const HowBuy = () => {
  //store
  const shoppingCart = useBuyStore((state) => state.shoppingCart);
  const setShoppingCart = useBuyStore((state) => state.setShoppingCart);
  const formOpen = useBuyStore((state) => state.formOpen);

  const { footerTimeline } = useContext(AnimContext);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    //recalculate footer scrollTrigger start and finish
    footerTimeline?.scrollTrigger.refresh();
  }, [formOpen]);

  useEffect(() => {
    const localSt = JSON.parse(localStorage.getItem("shoppingCart") as string);
    if (
      localSt &&
      Object.keys(localSt).length > 0 &&
      Object.keys(shoppingCart).length === 0
    ) {
      setShoppingCart(localSt, true);
    } else if (
      Object.keys(shoppingCart).length > 0 &&
      shoppingCart != localSt
    ) {
      localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    }
  }, [shoppingCart]);

  return (
    <div className={styles.container}>
      <div className={styles.shoppingCartNumber}>
        <div className={styles.shoppingNumber}>
          {Object.keys(shoppingCart).length}
        </div>
        <div className={styles.shoppingCartImg}>
          <img src={cartImg} alt="shopping cart" />
        </div>
      </div>
      {Object.keys(shoppingCart).length > 0 && !formOpen ? (
        <div className={styles.shoppingCart}>
          <ShoppingCart />
        </div>
      ) : (
        <div className={styles.buyForm}>
          <BuyForm />
          {/* <ShoppingCart /> */}
        </div>
      )}
    </div>
  );
};

export default HowBuy;
