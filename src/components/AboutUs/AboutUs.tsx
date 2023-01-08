import styles from "./AboutUs.module.scss";
import TextBox from "./TextBox";
import SpinningGallery from "./SpinningGallery";

const AboutUs = () => {
  return (
    <div className={styles.aboutus}>
      <div className={styles.intro}>
        <TextBox />
      </div>
      <SpinningGallery />
    </div>
  );
};

export default AboutUs;
