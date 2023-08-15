import { useEffect, useRef, useState } from "react";
import styles from "../../assets/styles/IndexInfoText.module.scss";
import useIndexInfoTextAnim from "../../hooks/useIndexInfoTextAnim";
import Cloudify from "../../utils/Cloudify";

const IndexInfoText = (): JSX.Element => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);


  useIndexInfoTextAnim({
    text: `.${styles.text}`,
    textWrapper: wrapperRef,
    image: `.${styles.image}`,
    container: `.${styles.container}`,
  } );
  
  const img: { imgTitle: string } = {
    imgTitle: "Jesu-Arte/DSC01302_jt2icr.jpg",
  };

  return (
    <div className={styles.textWrapper} ref={wrapperRef}>
      <div className={styles.container}>
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
    </div>
  );
};

export default IndexInfoText;
