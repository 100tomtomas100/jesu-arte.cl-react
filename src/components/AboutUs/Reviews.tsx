import styles from "../../assets/styles/Reviews.module.scss";
import { AiFillStar } from "react-icons/ai";
import useDB from "../../hooks/useDB";
import { useEffect, useState } from "react";
import Carousel from "nuka-carousel/lib/carousel";
import getWindowWidth from "../../utils/getWindowWidth";

const Reviews = ({className}:{className: string}): JSX.Element => {
  // const reviews: { [key: string]: unknown }[] = useDB();
  const [showMore, setShowMore] = useState<{ [key: number]: boolean }>({});
  const [windowWidth, setWindowWidth] = useState<number>(0)  
  
//check window width to change number of reviews shown 
  useEffect(() => {    
    const handleResize = ():void=> {
      setWindowWidth(getWindowWidth());
    }    
    handleResize()
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  },[])

  const countReviewStars = (numStars: number, key: number) => {
    let allStars: JSX.Element[] = [];
    for (let i: number = 0; numStars > i; i++) {
      allStars.push(<AiFillStar key={`star${i}${key}`} />);
    }
    return allStars;
  };
  const handleClick = (id: number) => {
    setShowMore({
      ...showMore,
      [id]: !showMore[id],
    });
  };

  return (
    <div className={`${styles.googleReviews} ${className}`}>
      {/* <Carousel
        slidesToShow={windowWidth > 800? 3: windowWidth > 400? 2: 1}
        wrapAround={true}
        autoplay={true}
        style={{
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        defaultControlsConfig={{
          nextButtonText: "\u232a",
          prevButtonText: "\u2329",
          prevButtonStyle: {
            backgroundColor: "transparent",
            border: "none",
            fontSize: "2em",
            color: "none",
          },
          nextButtonStyle: {
            backgroundColor: "transparent",
            border: "none",
            fontSize: "2em",
            color: "none",
          },
          pagingDotsStyle: {
            display: "none",
          },
        }}
      >
        {reviews.map((review, i: number) => {
          //place first 10 reviews in the carousel
          if (i < 10) {
            //number of characters till "read more"
            const charNum: number = 135;
            //max number of character for expanded text
            const maxCharNum: number = 500
          return (
            <div
              className={`${styles.container}`}
              key={review.plusId as number}
            >
              <div className={styles.wrapper}>
                <div className={styles.stars}>
                  {countReviewStars(
                    review.reviewRating as number,
                    review.plusId as number
                  )}
                </div>
                <p>
                  {showMore[review.plusId as number]
                    ? `${(review.reviewText as string).substring(
                        0,
                        maxCharNum
                      )} ${
                        (review.reviewText as string).substring(0).length >
                        maxCharNum
                          ? "..."
                          : ""
                      }`
                    : `${(review.reviewText as string).substring(0, charNum)}${
                        (review.reviewText as string).substring(0).length >
                        charNum
                          ? "..."
                          : ""
                      }`}
                </p>
                {(review.reviewText as string).substring(0).length > charNum ? (
                  <button
                    className={styles.button}
                    onClick={() => handleClick(review.plusId as number)}
                  >
                    {showMore[review.plusId as number] ? "Hide" : "Read More"}
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className={styles.client}>
                <img
                  className={styles.authorImg}
                  src={review.reviewAuthorImage as string}
                  referrerPolicy="no-referrer"
                />
                <p className={styles.authorName}>{review.reviewAuthor as string}</p>
                <p className={styles.daysAgo}>{review.reviewDate as string}</p>
              </div>
            </div>
          );
          }
        })}
      </Carousel> */}
    </div>
  );
};

export default Reviews;
