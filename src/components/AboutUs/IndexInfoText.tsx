import { useEffect, useState } from "react";
import styles from "../../assets/styles/IndexInfoText.module.scss";
import useIndexInfoTextAnim from "../../hooks/useIndexInfoTextAnim";
import Cloudify from "../../utils/Cloudify";
import getWindowWidth from "../../utils/getWindowWidth";

const IndexInfoText = (): JSX.Element => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = (): void => {
      setWindowWidth(getWindowWidth());
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useIndexInfoTextAnim(
    `.${styles.text}`,
    `.${styles.textWrapper}`,
    `.${styles.image}`,
    `${windowWidth > 600 ? false : true}`
  );
  const img: { imgTitle: string } = {
    imgTitle: "Jesu-Arte/DSC01302_jt2icr.jpg",
    // windowWidth > 600
    //   ? "Jesu-Arte/DSC01302_jt2icr.jpg"
    //   : "Jesu-Arte/DSC01294_hlwzba.jpg",
  };

  return (
    <div className={styles.textWrapper}>
      <div className={`${styles.image}`}>
        <Cloudify {...img}></Cloudify>
      </div>
      <div className={styles.text}>
        <p>
          <span className={styles.textColor}>¡Hola!</span> mi nombre es Jesu,
          <br />
          <span className={styles.textColor}>soy</span> artista autodidacta{" "}
          <br /> <span className={styles.textColor}>de</span> la región del
          Biobío, <br />
          <span className={styles.textColor}>Chile.</span>
        </p>
      </div>
    </div>
  );
};

export default IndexInfoText;
