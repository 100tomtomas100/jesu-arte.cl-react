import { useBuyStore } from "../../hooks/useStore";
import styles from "../../assets/styles/ShoppingCart.module.scss";

const ShoppingCart = () => {
  //store
  const shoppingCart = useBuyStore((state) => state.shoppingCart);
  const setShoppingCart = useBuyStore((state) => state.setShoppingCart);
  const formOpen = useBuyStore((state) => state.formOpen)
  const setFormOpen = useBuyStore((state) => state.setFormOpen)

  const totalPrice = () => {
    const allKeys = Object.keys(shoppingCart)
    let total = 0
    allKeys.map(key => {
      total += shoppingCart[key].price
    })
    return total
  }

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

  const addItem = () => {
    setFormOpen(true)    
  }

  const pay = async () => {
    try {
      // await fetch("http://localhost:3001/api/payment", {
      await fetch("https://www.jesu-arte.cl/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shoppingCart),
      })
        .then(async (res: Response) => {
          if (res.ok) return res.json();
          const json = await res.json();
          return await Promise.reject(json);
        })
        .then(({ url }) => {
          window.location.href = url;
          // console.log(url)
        });
    } catch (err: any){
      console.error(err.error)
    }

    // let result = await response.json();
    // console.log(result.status);
  };

  return (
    <div className={styles.container}>
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
              <button type="button" onClick={() => removeItem(item)}>
                Remove
              </button>
            </div>
          );
        })}
      </div>
      <div className={styles.bottom}>
        <div className={styles.totals}>
          <div className={styles.totalItems}>{`TOTAL ITEMS: ${
            Object.keys(shoppingCart).length
          }`}</div>
          <div
            className={styles.totalPrice}
          >{`TOTAL PRICE: $${totalPrice()}`}</div>
        </div>
        <div className={styles.buttons}>
          <button onClick={() => addItem()}>Add More</button>
          <button onClick={pay}>Pay</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
