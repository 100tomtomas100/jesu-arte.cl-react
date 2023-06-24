import styles from "../assets/styles/Gallery.module.scss";
import Cloudify from "../utils/Cloudify";
import { useState, useContext, useRef } from "react";
//@ts-ignore
import Columned from "react-columned";
import { css } from "@emotion/css";
import LargeImgGallery from "../components/Gallery/LargeImgGallery";
import useGetImgList from "../hooks/useGetImgList";
import AnimContext from "../context/AnimContext";
import useGalleryAnim from "../hooks/useGalleryAnim";
import getPrevNextImgNum from "../utils/getPrevNextImgNum";
import useGalStore from "../hooks/useStore";

const Gallery = (): JSX.Element => {
  const list: {
    [key: string]: { [key: string]: string | number };
  } = useGetImgList();
  const { footerTimeline } = useContext(AnimContext);
  const [galLoaded, setGalLoaded] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  //store
  const setImgPrevCurrNext = useGalStore((state) => state.setImgPrevCurrNext);
  const setLargeGalOn = useGalStore((state) => state.setLargeGalOn);
  const largeGalAnimRunning = useGalStore((state) => state.largeGalAnimRunning);
  const setLargeGalAnimRunning = useGalStore(
    (state) => state.setLargeGalAnimRunning
  );

  //images getting on screen anim
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

  //open large gallery
  const handleClick = (e: React.MouseEvent) => {
    if (!largeGalAnimRunning) {
      const numberInList = Number(e.currentTarget.getAttribute("data-number"));
      setImgPrevCurrNext(
        getPrevNextImgNum({
          listLength: Object.keys(list).length,
          currentNum: numberInList,
        })
      );
      setLargeGalOn(true);
      setLargeGalAnimRunning(true);
    }
  };

  const refresh = () => {
    //footer does not show up without refresh when switching between pages
    footerTimeline.scrollTrigger.refresh();
    //when gallery images are loaded (the animation placing images on screen depends on this)
    setGalLoaded(true);
  };

  return (
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
              >
                <Cloudify
                  imgTitle={list[index].public_id as string}
                  hasLoaded={
                    Object.keys(list).length - 1 === Number(index)
                      ? refresh
                      : ""
                  }
                />
              </div>
            );
          })}
        </Columned>
      </div>
      <LargeImgGallery {...{ list }} />
    </div>
  );
};

export default Gallery;
