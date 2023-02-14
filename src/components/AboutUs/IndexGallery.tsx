import styles from "../../assets/styles/IndexGallery.module.scss";
import wall from "../../assets/images/brickWall.svg";
import Cloudify from "../../utils/Cloudify";
import useIndexGalleryAnim from "../../hooks/useIndexGalleryAnim";
import arrow from "../../assets/images/arrow.svg";
import DoorsClosed from "../../utils/svg/DoorsClosed";
import { NavigateFunction, useNavigate } from "react-router-dom";

const IndexGallery = (): JSX.Element => {
  const navigation: NavigateFunction = useNavigate();
  
  useIndexGalleryAnim({
    background: `.${styles.backgroundImg}`,
    paintings: `.${styles.wallPainting}`,
    text: `.${styles.text}`,
    arrow: `.${styles.arrow}`,
    gallery: `.${styles.gallery}`,
  });

  const propsDog: { imgTitle: string } = {
    imgTitle: "Jesu-Arte/Gallery/gallery7_m6rkmy.jpg",
  };

  const propsCat: { imgTitle: string } = {
    imgTitle: "Jesu-Arte/Gallery/gallery0_pc6kvw.jpg",
  };

  const propsDog2: { imgTitle: string } = {
    imgTitle: "Jesu-Arte/Gallery/gallery4_rl2ibv.jpg",
  };

  const handleClick = () => {
    navigation("./portfolio")
  }

  return (
    <div className={`${styles.gallery}`}>
      <p className={`${styles.text} ${styles.visita}`}>
        Visita
        <br />
      </p>
      <p className={`${styles.text} ${styles.mi}`}>
        Mi <br />
      </p>
      <p className={`${styles.text} ${styles.galeria}`}>
        Galería <br />
      </p>
      <div className={`${styles.text} ${styles.img}`} onClick={handleClick}>
        <img className={styles.arrow} src={arrow} alt="direction arrow" />
      </div>

      <div className={`${styles.wallPainting} ${styles.catImg}`}>
        <Cloudify {...propsCat} />
      </div>
      <div className={`${styles.wallPainting} ${styles.dog2Img}`}>
        <Cloudify {...propsDog2} />
      </div>
      <div className={`${styles.wallPainting} ${styles.dogImg}`}>
        <Cloudify {...propsDog} />
      </div>
      <DoorsClosed className={`${styles.backgroundImg}`} />
      <img
        src={wall}
        alt="wall"
        className={`${styles.wall} ${styles.backgroundImg}`}
      />
    </div>
  );
};

export default IndexGallery;
