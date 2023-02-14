import styles from "../../assets/styles/InfoReviews.module.scss";
import Reviews from "./Reviews";
import ReviewsText from "./ReviewsText";
import ReviewsTitle from "./ReviewsTitle";
import useReviewsAnim from "../../hooks/useReviewsAnim";
import { useState } from "react";

const InfoReviews = (): JSX.Element => {
  const [titleSvgRef, setTitleSvgRef] = useState<SVGPathElement | null>(null);

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
  
  useReviewsAnim({ ...classes, scope: `${styles.infoReviews}`, titleSvgRef: titleSvgRef });

  return (
    <div className={`${styles.infoReviews}`}>
      <ReviewsTitle className={classes.title} setRef={setTitleSvgRef} />
      <ReviewsText className={classes.text} />
      <Reviews className={classes.reviews} />
    </div>
  );
};

export default InfoReviews;
