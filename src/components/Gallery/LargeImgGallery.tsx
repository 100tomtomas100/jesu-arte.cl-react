import styles from "../../assets/styles/LargeImgGallery.module.scss";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdClose } from "react-icons/md";
import getPrevNextImgNum from "../../utils/getPrevNextImgNum";
import GalleryOpenImg from "./GalleryOpenImg";
import PreloadImg from "./PreloadImg";
import Loading from "./Loading";
import { createPortal } from "react-dom";
import useGalStore from "../../hooks/useStore";

interface PropsTypes {
  list: {
    [key: string]: { [key: string]: string | number };
  };
}

const LargeImgGallery = (props: PropsTypes): JSX.Element => {
  const WrapperRef = useRef<HTMLDivElement | null>(null);
  const [imgShowing, setImgShowing] = useState<string>("curr");
  const [loadingAnim, setLoadingAnim] = useState(false);
  const [animAfterLoad, setAnimAfterLoad] = useState("");
  const [waitingNr, setWaitingNr] = useState<number | null>(null);

  //store
  const imgPrevCurrNext = useGalStore((state) => state.imgPrevCurrNext);
  const setImgPrevCurrNext = useGalStore((state) => state.setImgPrevCurrNext);
  const setLargeGalOn = useGalStore((state) => state.setLargeGalOn);
  const largeGalAnimRunning = useGalStore((state) => state.largeGalAnimRunning);
  const setLargeGalAnimRunning = useGalStore(
    (state) => state.setLargeGalAnimRunning
  );
  const loadedImages = useGalStore((state) => state.loadedImages);

  //if next image to show is not loaded, wait for it to load before showing
  useEffect(() => {
    if (!loadingAnim) {
      setAnimAfterLoad("");
      setWaitingNr(null);
      if (animAfterLoad === "prev") {
        handlePrevClick();
      } else if (animAfterLoad === "next") {
        handleNextClick();
      }
    }
  }, [loadingAnim]);

  //recalculate values for prev curr next
  function calcPrevCurrNext(curr: number) {
    setImgPrevCurrNext(
      getPrevNextImgNum({
        listLength: Object.keys(props.list).length,
        currentNum: curr,
        imgShowing: imgShowing,
        imgPrevCurrNext: imgPrevCurrNext,
      })
    );
  }

  const handlePrevClick = () => {
    const prevImg = imgPrevCurrNext.prev;
    
    //check if animation is not currently running and if the prev image is loaded
    if (
      imgShowing === "curr" &&
      !largeGalAnimRunning &&
      loadedImages[prevImg]
    ) {
      calcPrevCurrNext(prevImg);
      setImgShowing("curr2");
      setLargeGalAnimRunning(true);
    } else if (
      imgShowing === "curr2" &&
      !largeGalAnimRunning &&
      loadedImages[prevImg]
    ) {
      calcPrevCurrNext(prevImg);
      setImgShowing("curr");
      setLargeGalAnimRunning(true);
    } else if (!loadedImages[prevImg] && !largeGalAnimRunning) {
      setLoadingAnim(true);
      setAnimAfterLoad("prev");
      setWaitingNr(prevImg);
    }
  };

  const handleNextClick = () => {
    const nextImg = imgPrevCurrNext.next;

    //check if animation is not currently running and if the next image is loaded
    if (
      imgShowing === "curr" &&
      !largeGalAnimRunning &&
      loadedImages[nextImg]
    ) {
      calcPrevCurrNext(nextImg);
      setImgShowing("curr2");
      setLargeGalAnimRunning(true);
    } else if (
      imgShowing === "curr2" &&
      !largeGalAnimRunning &&
      loadedImages[nextImg]
    ) {
      calcPrevCurrNext(nextImg);
      setImgShowing("curr");
      setLargeGalAnimRunning(true);
    } else if (!loadedImages[nextImg] && !largeGalAnimRunning) {      
      setLoadingAnim(true);
      setAnimAfterLoad("next");
      setWaitingNr(nextImg);
    }
  };

  const handleClose = () => {
    if (!largeGalAnimRunning) {
      setLargeGalOn(false);
      setLargeGalAnimRunning(true);
    }
  };

  const changeImgProps = {
    wrapper: WrapperRef,
    imgShowing: imgShowing,
  };

  const GalleryOpenImgProps = {
    wrapper: WrapperRef,
    background: `.${styles.background}`,
    list: props.list,
    changeImgProps: changeImgProps,
    setImgShowing: setImgShowing,
  };
  const preloadProps = {
    class: styles.preload,
    list: props.list,
    setLoadingAnim: setLoadingAnim,
    waitingNr: waitingNr,
  };

  return (
    <>
      {createPortal(
        <div ref={WrapperRef} className={styles.wrapper}>
          <div className={styles.background}>
            <div className={styles.closeButton} onClick={handleClose}>
              <MdClose />
            </div>
            {/* spinning loading anim on image change while loading the image*/}
            <Loading visible={loadingAnim} />
            {/* preload images on both sides of the arrows */}
            <PreloadImg {...preloadProps} />
            <GalleryOpenImg {...GalleryOpenImgProps} />
            <div
              className={`${styles.sideArrow} ${styles.arrowBack}`}
              onClick={handlePrevClick}
            >
              <IoIosArrowBack />
            </div>
            <div
              className={`${styles.sideArrow} ${styles.arrowForward}`}
              onClick={handleNextClick}
            >
              <IoIosArrowForward />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default LargeImgGallery;
