import styles from "../../assets/styles/InfoReviews.module.scss";
import Reviews from "./Reviews";
import ReviewsText from "./ReviewsText";
import ReviewsTitle from "./ReviewsTitle";
import useReviewsAnim from "../../hooks/useReviewsAnim";
import { useRef, useState } from "react";

const InfoReviews = (): JSX.Element => {
  const [titleSvgRef, setTitleSvgRef] = useState<SVGPathElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
    
  interface ClassesTypes {
    title: string,
    text: string,
    reviews: string
  }

  const classes: ClassesTypes = {
    title: "reviewsTitle",
    text: "reviewsText",
    reviews: "reviews"
  };
  
  useReviewsAnim({
    ...classes,
    scope: wrapperRef,
    titleSvgRef: titleSvgRef,
    container: `.${styles.container}`,
  });

  return (
    <div className={`${styles.infoReviews}`} ref={wrapperRef}>
      <div className={styles.container}>
        <ReviewsTitle className={classes.title} setRef={setTitleSvgRef} />
        <ReviewsText className={classes.text} />
        <Reviews className={classes.reviews} />
      </div>
    </div>
  );
};

export default InfoReviews;
