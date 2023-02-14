import styles from "../../assets/styles/ReviewsTitle.module.scss";
import Splashes from "../../utils/svg/Splashes";

const ReviewsTitle = (props: {
  className: string;
  setRef: (sRef: SVGPathElement | null) => void;
}): JSX.Element => {
  return (
    <div className={`${styles.title} ${props.className}`}>
      <Splashes setSplashesRef={props.setRef} />
    </div>
  );
};

export default ReviewsTitle;
