import { useState, useEffect } from "react";
import Cloudify from "../../utils/Cloudify";
import getImgLargeGallerySize from "../../utils/getImgLargeGallerySize";

interface PropsTypes {
  class: string;
  loadedImages: any;
  setLoadedImages: any;
  imgPrevCurrNext: {
    [key: string]: number;
  };
  setImgPrevCurrNext: React.Dispatch<
    React.SetStateAction<{
      [key: string]: number;
    }>
  >;
  list: {
    [key: string]: { [key: string]: string | number };
  };
  clickedImg: number | null;
  setLoadingAnim: React.Dispatch<React.SetStateAction<boolean>>;
  waitingNr: number | null;
}

const PreloadImg = (props: PropsTypes): JSX.Element => {
  const [preloadImages, setPreloadImages] = useState<any>([]);
  useEffect(() => {
    if (
      Object.keys(props.imgPrevCurrNext).length > 0 &&
      props.loadedImages[props.clickedImg as number]
    ) {
      //check if images of prev and next are already loaded and set props for preloading
      const checkLoad = () => {
        let preload = [props.imgPrevCurrNext.prev, props.imgPrevCurrNext.next];
        const length = Object.keys(props.loadedImages).length;

        for (let i = 0; i < length; i++) {
          if (
            props.imgPrevCurrNext.prev ===
            Number(Object.keys(props.loadedImages)[i])
          ) {
            preload.shift();
          }
          if (
            props.imgPrevCurrNext.next ===
            Number(Object.keys(props.loadedImages)[i])
          ) {
            preload.pop();
          }
        }

        //set props for preloading images
        const preloadProps = preload.map((img) => {
          return {
            [img]: {
              title: props.list[img].public_id,
              imgWidth: getImgLargeGallerySize({
                clickedImgInfo: props.list[img],
              }),
            },
          };
        });
        return preloadProps;
      };
      setPreloadImages(checkLoad());
    }
  }, [props.imgPrevCurrNext, props.loadedImages[props.clickedImg as number]]);

  const handleLoaded = (num: any) => {
    if (!props.loadedImages[num]) {
      props.setLoadedImages({ ...props.loadedImages, [num]: true });
      if (props.waitingNr === Number(num)) {
        props.setLoadingAnim(false);
      }
    }
    console.log(num)
    console.log(props.waitingNr)
    console.log(props)
  };
  return (
    <div>
      {(preloadImages as []).map((img) => {
        const imgNumber = Object.keys(img)[0];

        return (
          <div className={props.class} key={img[imgNumber]["title"]}>
            <Cloudify
              imgTitle={img[imgNumber]["title"]}
              imgWidth={img[imgNumber]["imgWidth"]}
              hasLoaded={() => {
                handleLoaded(imgNumber);
              }}
            />{" "}
          </div>
        );
      })}
    </div>
  );
};

export default PreloadImg;
