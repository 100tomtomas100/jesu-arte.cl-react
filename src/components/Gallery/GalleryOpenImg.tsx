import getImgLargeGallerySize from "../../utils/getImgLargeGallerySize";
import styles from "../../assets/styles/GalleryOpenImg.module.scss";
import Cloudify from "../../utils/Cloudify";
import { useEffect, useState } from "react";
import useDisplayLargeGalAnim from "../../hooks/useDisplayLargeGalAnim";
import useChangeImgAnim from "../../hooks/useChangeImgAnim";
import useStore from "../../hooks/useStore";

interface PropsTypes {
  wrapper: React.MutableRefObject<HTMLDivElement | null>;
  background: string;
  list: {
    [key: string]: { [key: string]: string | number };
  };
  changeImgProps: any;
  setImgShowing: React.Dispatch<React.SetStateAction<string>>;
}

const GalleryOpenImg = (props: PropsTypes): JSX.Element => {
  const [displayLargeProps, setDisplayLargeProps] = useState({});
  const [currKey, setCurrKey] = useState({ curr: 110, curr2: -110 });
  const [changeImgProps, setChangeImgProps] = useState({});

  //store
  const imgPrevCurrNext = useStore((state) => state.imgPrevCurrNext);
  const largeGalOn = useStore((state) => state.largeGalOn);
  const loadedImages = useStore((state) => state.loadedImages);
  const setLoadedImages = useStore((state) => state.setLoadedImages);


  useDisplayLargeGalAnim({ ...displayLargeProps });
  useChangeImgAnim({ ...changeImgProps });

  useEffect(() => {
    setChangeImgProps({
      ...props.changeImgProps,
      currentImg: `.${styles.currImg}`,
      currentImg2: `.${styles.currImg2}`,
      setCurrKey: setCurrKey,
      currKey: currKey,
      loadedImg: loadedImages,
    });
  }, [props.changeImgProps.imgShowing, currKey]);

  //for opening and closing the large gallery
  useEffect(() => {
    //set up props to open or close large gallery
    if (loadedImages[imgPrevCurrNext.curr] || !largeGalOn) {
      setDisplayLargeProps({
        clickedImgClass: `.${styles.currImg}`,
        wrapper: props.wrapper,
        background: props.background,
        clickedImgLoaded: loadedImages[imgPrevCurrNext.curr],
        setCurrKey: setCurrKey,
        currKey: currKey,
        imgShowing: props.changeImgProps.imgShowing,
        setImgShowing: props.setImgShowing,
      });
    }
  }, [loadedImages[imgPrevCurrNext.curr], largeGalOn, currKey]);

  const handleLoaded = (num: any) => {
    if (!loadedImages[num]) {
      setLoadedImages({ ...loadedImages, [num]: true });
    }
  };

  return (
    <>
      <div className={`${styles.currImg}`} key={currKey.curr}>
        {imgPrevCurrNext.curr > -1 ? (
          <Cloudify
            imgTitle={props.list[imgPrevCurrNext.curr].public_id as string}
            imgWidth={getImgLargeGallerySize({
              clickedImgInfo: props.list[imgPrevCurrNext.curr],
            })}
            hasLoaded={() => {
              handleLoaded(imgPrevCurrNext.curr);
            }}
          />
        ) : (
          ""
        )}
      </div>
      <div className={`${styles.currImg2}`} key={currKey.curr2}>
        {imgPrevCurrNext.curr2 > -1 ? (
          <Cloudify
            imgTitle={props.list[imgPrevCurrNext.curr2].public_id as string}
            imgWidth={getImgLargeGallerySize({
              clickedImgInfo: props.list[imgPrevCurrNext.curr2],
            })}
            hasLoaded={() => {
              handleLoaded(imgPrevCurrNext.curr2);
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
