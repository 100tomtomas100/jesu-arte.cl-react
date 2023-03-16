import styles from "../../assets/styles/LargeImgGallery.module.scss";
import { useEffect, useRef, useState } from "react";
import useChangeImgAnim from "../../hooks/useChangeImgAnim";
import getImgLargeGallerySize from "../../utils/getImgLargeGallerySize";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdClose } from "react-icons/md";
import getPrevNextImgNum from "../../utils/getPrevNextImgNum";
import GalleryOpenImg from "./GalleryOpenImg";
import PreloadImg from "./PreloadImg";
import Loading from "./Loading";
import { createPortal } from "react-dom";

interface PropsTypes {
  clickedImg: number | null;
  largeGal: boolean;
  setLargeGal: React.Dispatch<React.SetStateAction<boolean>>;
  list: {
    [key: string]: { [key: string]: string | number };
  };
  setClickedImg: React.Dispatch<React.SetStateAction<number | null>>
}

const LargeImgGallery = (props: PropsTypes): JSX.Element => {
  const WrapperRef = useRef<HTMLDivElement | null>(null);
  const [imgPrevCurrNext, setImgPrevCurrNext] = useState<{
    [key: string]: number;
  }>({});
  const [splitImg, setSplitImg] = useState<Splitting.Result | null>(null);
  // const [changeImgProps, setChangeImgProps] = useState({});
  const [currKey, setCurrKey] = useState({ curr: 110, curr2: 110 });
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [imgShowing, setImgShowing] = useState<string>("curr");
  const [animInAct, setAnimInAct] = useState(false);
  const [loadingAnim, setLoadingAnim] = useState(false);
  const [animAfterLoad, setAnimAfterLoad] = useState("");
  const [waitingNr, setWaitingNr] = useState<number | null>(null);

  useEffect(() => {
    if (!loadingAnim && animAfterLoad === "prev") {
      handlePrevClick();
      setAnimAfterLoad("");
      setWaitingNr(null);
    } else if (!loadingAnim && animAfterLoad === "next") {
      handleNextClick();
      setAnimAfterLoad("");
      setWaitingNr(null);
    }
  }, [loadingAnim]);

  const handlePrevClick = () => {
    const prevNum = () => {
      if (imgPrevCurrNext[imgShowing] === 0) {
        return Object.keys(props.list).length - 1;
      } else {
        return imgPrevCurrNext[imgShowing] - 1;
      }
    };

    function calcPrevCurrNext() {
      setImgPrevCurrNext(
        getPrevNextImgNum({
          listLength: Object.keys(props.list).length,
          currentNum: prevNum(),
          imgShowing: imgShowing,
          imgPrevCurrNext: imgPrevCurrNext,
        })
      );
    }
    
    //check if animation is not currently running and if the prev image is loaded
    if (imgShowing === "curr" && !animInAct && loadedImages[prevNum()]) {
      calcPrevCurrNext();
      setImgShowing("curr2");
      setAnimInAct(true);
    } else if (
      imgShowing === "curr2" &&
      !animInAct &&
      loadedImages[prevNum()]
    ) {
      calcPrevCurrNext();
      setImgShowing("curr");
      setAnimInAct(true);
    } else if (!loadedImages[prevNum()] && !animInAct) {
      setLoadingAnim(true);
      setAnimAfterLoad("prev");
      setWaitingNr(prevNum());
    }
  };

  const handleNextClick = () => {
    const nextNum = () => {
      if (imgPrevCurrNext[imgShowing] === Object.keys(props.list).length - 1) {
        return 0;
      } else {
        return imgPrevCurrNext[imgShowing] + 1;
      }
    };

    function calcPrevCurrNext() {
      setImgPrevCurrNext(
        getPrevNextImgNum({
          listLength: Object.keys(props.list).length,
          currentNum: nextNum(),
          // imgPrevCurrNext[imgShowing] === Object.keys(props.list).length - 1
          //   ? 0
          //   : imgPrevCurrNext[imgShowing] + 1,
          imgShowing: imgShowing,
          imgPrevCurrNext: imgPrevCurrNext,
        })
      );
    }
    //check if animation is not currently running and if the next image is loaded
    if (imgShowing === "curr" && !animInAct && loadedImages[nextNum()]) {
      calcPrevCurrNext();
      setImgShowing("curr2");
      setAnimInAct(true);
    } else if (
      imgShowing === "curr2" &&
      !animInAct &&
      loadedImages[nextNum()]
    ) {
      calcPrevCurrNext();
      setImgShowing("curr");
      setAnimInAct(true);
    } else if (!loadedImages[nextNum()] && !animInAct) {
      setLoadingAnim(true);
      setAnimAfterLoad("next");
      setWaitingNr(nextNum());
    }
  };

  const handleClose = () => {
    props.setLargeGal(false)
    props.setClickedImg(null)
  }

  const changeImgProps = {
    splitImg: splitImg,
    setSplitImg: setSplitImg,
    imgPrevCurrNext: imgPrevCurrNext,
    // currentImg: `.${styles.currImg}`,
    wrapper: WrapperRef,
    imgShowing: imgShowing,
    loadedImages: loadedImages,
    animInAct: animInAct,
    setAnimInAct: setAnimInAct,
  };

  const GalleryOpenImgProps = {
    largeGal: props.largeGal,
    wrapper: WrapperRef,
    background: `.${styles.background}`,
    setSplitImg: setSplitImg,
    splitImg: splitImg,
    clickedImg: props.clickedImg as number,
    list: props.list,
    imgPrevCurrNext: imgPrevCurrNext,
    setImgPrevCurrNext: setImgPrevCurrNext,
    loadedImages: loadedImages,
    setLoadedImages: setLoadedImages,
    changeImgProps: changeImgProps,
    setImgShowing: setImgShowing,
    setClickedImg: props.setClickedImg
  };
  const preloadProps = {
    class: styles.preload,
    loadedImages: loadedImages,
    setLoadedImages: setLoadedImages,
    imgPrevCurrNext: imgPrevCurrNext,
    setImgPrevCurrNext: setImgPrevCurrNext,
    list: props.list,
    clickedImg: props.clickedImg,
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
            <Loading visible={loadingAnim} />
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
    </div>
    ,
        document.body
      )}
    </>
  );
};

export default LargeImgGallery;
