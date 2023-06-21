import styles from "../assets/styles/Gallery.module.scss";
import Cloudify from "../utils/Cloudify";
import { useLayoutEffect, useState, useContext, useRef } from "react";
//@ts-ignore
import Columned from "react-columned";
import { css } from "@emotion/css";
import LargeImgGallery from "../components/Gallery/LargeImgGallery";
import useGetImgList from "../hooks/useGetImgList";
import AnimContext from "../context/AnimContext";
import useGalleryAnim from "../hooks/useGalleryAnim";

const Gallery = (): JSX.Element => {
  const [clickedImg, setClickedImg] = useState<number | null>(null);
  const [largeGal, setLargeGal] = useState<boolean>(false);
  const list: {
    [key: string]: { [key: string]: string | number };
  } = useGetImgList();
  const { footerTimeline } = useContext(AnimContext)
  const [galLoaded, setGalLoaded] = useState<boolean>(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  useGalleryAnim({
    loaded: galLoaded,
    wrapper: wrapperRef,
    images: `.${styles.image}`,
  });

  // styles for masonry gallery set up
  const columnedStyles: string = css({
    img: {
      display: "block",
    },
  });
  const handleClick = (e: React.MouseEvent) => {
    const numberInList = Number(e.currentTarget.getAttribute("data-number"));
    setLargeGal(true);
    setClickedImg(numberInList);    
  };
  
  const LargeImgGalleryProps = {
    clickedImg: clickedImg,
    setClickedImg: setClickedImg,
    largeGal: largeGal,
    setLargeGal: setLargeGal,
    list: list,
  };

  const refresh = () => {
    footerTimeline.scrollTrigger.refresh()
    setGalLoaded(true)
  }

  return (
    <>
    <div className={styles.gallery} ref={wrapperRef}>
      <div className={styles.columnedWrapper}>
        <Columned className={columnedStyles}>
          {Object.keys(list).map((index) => {
            return (
              <div
                className={`${styles.image}`}
                key={list[index].public_id}
                onClick={handleClick}
                data-number={`${index}`}
                // style={{position:"relative"}}
              >
                <Cloudify imgTitle={list[index].public_id as string}
                  hasLoaded={Object.keys(list).length - 1 === Number(index)? refresh: ""}
                />
              </div>
            );
          })}
        </Columned>
      </div>
      <LargeImgGallery {...LargeImgGalleryProps} />
      </div>
    </>
  );
};

export default Gallery;
