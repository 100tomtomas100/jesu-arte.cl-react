import getImgLargeGallerySize from "../../utils/getImgLargeGallerySize";
import styles from "../../assets/styles/GalleryOpenImg.module.scss";
import Cloudify from "../../utils/Cloudify";
import { useEffect, useState } from "react";
import useDisplayLargeGalAnim from "../../hooks/useDisplayLargeGalAnim";
import getPrevNextImgNum from "../../utils/getPrevNextImgNum";
import useChangeImgAnim from "../../hooks/useChangeImgAnim";

interface PropsTypes {
  largeGal: boolean;
  wrapper: React.MutableRefObject<HTMLDivElement | null>;
  background: string;
  setSplitImg: React.Dispatch<React.SetStateAction<Splitting.Result | null>>;
  splitImg: Splitting.Result | null;
  clickedImg: number;
  list: {
    [key: string]: { [key: string]: string | number };
  };
  imgPrevCurrNext: {
    [key: string]: number;
  };
  setImgPrevCurrNext: React.Dispatch<
    React.SetStateAction<{
      [key: string]: number;
    }>
  >;
  changeImgProps: any;
  loadedImages: any;
  setLoadedImages: any;
  setImgShowing: React.Dispatch<React.SetStateAction<string>>;
  setClickedImg: React.Dispatch<React.SetStateAction<number | null>>;
}

const GalleryOpenImg = (props: PropsTypes): JSX.Element => {
  const [displayLargeProps, setDisplayLargeProps] = useState({});
  const [currKey, setCurrKey] = useState({ curr: 110, curr2: -110 });
  const [changeImgProps, setChangeImgProps] = useState({});
  const [openGal, setOpenGal] = useState(false);

  useDisplayLargeGalAnim({ ...displayLargeProps });
  useChangeImgAnim({ ...changeImgProps });

  useEffect(() => {
    setChangeImgProps({
      ...props.changeImgProps,
      currentImg: `.${styles.currImg}`,
      currentImg2: `.${styles.currImg2}`,
      setCurrKey: setCurrKey,
      currKey: currKey,
      loadedImg: props.loadedImages,
    });
  }, [props.changeImgProps.imgShowing]);

  useEffect(() => {
    //set prev next curr image numbers
    if (props.clickedImg !== null && props.list && props.largeGal) {
      props.setImgPrevCurrNext(
        getPrevNextImgNum({
          listLength: Object.keys(props.list).length,
          currentNum: props.clickedImg,
        })
      );
      setOpenGal(true);
    }
  }, [props.clickedImg]);

  //for opening and closing the large gallery
  useEffect(() => {
    //set up props to open or close large gallery
    if (
      (props.loadedImages[props.clickedImg as number] && openGal) ||
      !props.largeGal
    ) {
      setDisplayLargeProps({
        clickedImgClass: `.${styles.currImg}`,
        wrapper: props.wrapper,
        background: props.background,
        clickedImgLoaded: props.loadedImages[props.clickedImg],
        setSplitImg: props.setSplitImg,
        splitImg: props.splitImg,
        largeGal: props.largeGal,
        setCurrKey: setCurrKey,
        currKey: currKey,
        imgShowing: props.changeImgProps.imgShowing,
        setImgShowing: props.setImgShowing,
        setImgPrevCurrNext: props.setImgPrevCurrNext,
       
      });
      setOpenGal(false);
    }
  }, [props.loadedImages[props.clickedImg as number], openGal, props.largeGal]);

  const handleLoaded = (num: any) => {
    if (!props.loadedImages[num]) {
      props.setLoadedImages({ ...props.loadedImages, [num]: true });
    }
  };

  return (
    <>
      <div
        className={`${styles.currImg}`}
        key={currKey.curr}
      >
        {props.imgPrevCurrNext.curr > -1 ? (
          <Cloudify
            imgTitle={
              props.list[props.imgPrevCurrNext.curr].public_id as string
            }
            imgWidth={getImgLargeGallerySize({
              clickedImgInfo: props.list[props.imgPrevCurrNext.curr],
            })}
            hasLoaded={() => {
              handleLoaded(props.imgPrevCurrNext.curr);
            }}
          />
        ) : (
          ""
        )}
      </div>
      <div
        className={`${styles.currImg2}`}
        key={currKey.curr2}
      >
        {props.imgPrevCurrNext.curr2 > -1 ? (
          <Cloudify
            imgTitle={
              props.list[props.imgPrevCurrNext.curr2].public_id as string
            }
            imgWidth={getImgLargeGallerySize({
              clickedImgInfo: props.list[props.imgPrevCurrNext.curr2],
            })}
            hasLoaded={() => {
              handleLoaded(props.imgPrevCurrNext.curr2);
            }}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default GalleryOpenImg;
