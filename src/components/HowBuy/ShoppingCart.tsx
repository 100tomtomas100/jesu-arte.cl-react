import { useBuyStore } from "../../hooks/useStore";
import styles from "../../assets/styles/ShoppingCart.module.scss";
import { storage } from "../../utils/firebase";
import { ref, uploadString, getDownloadURL, StorageReference } from "firebase/storage";
import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useInactiveScreenStore } from "../../hooks/useStore";
import useShoppingCartAnim from "../../hooks/useShoppingCartAnim";
import AnimContext from "../../context/AnimContext";

const ShoppingCart = () => {
  const [loadingCheckout, setLoadingCheckout] = useState<boolean>(true);

  //store
  //shoppingCart
  const shoppingCart = useBuyStore((state) => state.shoppingCart);
  const setShoppingCart = useBuyStore((state) => state.setShoppingCart);
  const formOpen = useBuyStore((state) => state.formOpen);
  const setFormOpen = useBuyStore((state) => state.setFormOpen);
  const setInactiveScreen = useInactiveScreenStore((state) => state.setActive);

  const { footerTimeline } = useContext(AnimContext);


  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    //recalculate footer scrollTrigger start and finish
    footerTimeline?.scrollTrigger.refresh();
  }, [])

  useShoppingCartAnim({
    items: `.${styles.item}`,
    buttons: `.${styles.buttonShopp}`,
    totals: `.${styles.totals}`,
    container: containerRef,
  });

  //total price for shopping cart
  const totalPrice = () => {
    const allKeys = Object.keys(shoppingCart);
    let total: number = 0;
    allKeys.map((key) => {
      total += shoppingCart[key].price;
    });
    return total;
  };

  //remove single item from shopping cart
  const removeItem = (item: string) => {
    const copy = { ...shoppingCart };
    delete copy[item];
    if (Object.keys(copy).length === 0) {
      localStorage.removeItem("shoppingCart");
    } else {
      localStorage.setItem("shoppingCart", JSON.stringify(copy));
    }
    setShoppingCart(copy, true);
  };

  //open form for new item to add to shopping cart
  const addItem = () => {
    setFormOpen(true);
  };

  //pay for the shopping cart
  const pay = async () => {
    setLoadingCheckout(true);
    setInactiveScreen(true);
    const shoppingCartIds = Object.keys(shoppingCart);
    const userId = (`user${new Date().getTime()}${shoppingCart[
      shoppingCartIds[0]
    ].image.substr(50, 20)}`).replace(/\//g, ']')
    const imgCount = Object.keys(shoppingCart).length;
    try {
      let imgURLs: { [number: string]: any } = {};
      for (let i: number = 0; i < imgCount; i++) {
        const image = shoppingCart[shoppingCartIds[i]].image;
        const storageRef = ref(storage, `temp/${userId}/${i}.png`);
        uploadString(storageRef as StorageReference, image, "data_url").then(
          (snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
              imgURLs = { ...imgURLs, [shoppingCartIds[i]]: downloadURL };
            });
          }
        );
      }

      const purchaseData = { shoppingCart, user: userId, imgUrls: imgURLs };

      // redirect to payment
      await fetch(
        process.env.NODE_ENV === "development"
          ? "http://localhost:3001/api/payment"
          : "https://www.jesu-arte.cl/api/payment",
        {
          // await fetch("https://www.jesu-arte.cl/api/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(purchaseData),
        }
      )
        .then(async (res: Response) => {
          if (res.ok) return res.json();
          const json = await res.json();
          return await Promise.reject(json);
        })
        .then(({ url }) => {
          window.location.href = url;
          // console.log(url)
        });
    } catch (err: any) {
      console.error(err.error);
    }

    // let result = await response.json();
    // console.log(result.status);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.allItems}>
        {Object.keys(shoppingCart).map((item: string) => {
          //   console.log(shoppingCart[item].size);
          const imgSize = shoppingCart[item].size
            ?.substr(1)
            .replaceAll("_", " ");
          const imgTech =
            shoppingCart[item].technique?.substr(0, 1).toUpperCase() +
            shoppingCart[item].technique?.substr(1);

          return (
            <div className={styles.item} key={item}>
              <div className={styles.image}>
                <img src={shoppingCart[item].image} alt="" />
              </div>
              <div className={styles.technique}>
                <p>{imgTech}</p>
              </div>
              <div className={styles.size}>
                <p>{imgSize}</p>
              </div>
              <div className={styles.price}>
                {"$" + shoppingCart[item].price}
              </div>
              <button
                className={styles.buttonShopp}
                type="button"
                onClick={() => removeItem(item)}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
      <div className={styles.bottom}>
        <div className={styles.totals}>
          <div
            className={`${styles.totalItems}, ${styles.totals}`}
          >{`TOTAL ITEMS: ${Object.keys(shoppingCart).length}`}</div>
          <div
            className={`${styles.totalPrice}, ${styles.totals}`}
          >{`TOTAL PRICE: $${totalPrice()}`}</div>
        </div>
        <div className={styles.buttons}>
          <button className={styles.buttonShopp} onClick={() => addItem()}>
            Add More
          </button>
          <button className={styles.buttonShopp} onClick={pay}>
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
