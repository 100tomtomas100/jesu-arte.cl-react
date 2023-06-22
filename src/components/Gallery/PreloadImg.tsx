import { useState, useEffect } from "react";
import Cloudify from "../../utils/Cloudify";
import getImgLargeGallerySize from "../../utils/getImgLargeGallerySize";
import useGalStore from "../../hooks/useStore";

interface PropsTypes {
  class: string;
  list: {
    [key: string]: { [key: string]: string | number };
  };
  setLoadingAnim: React.Dispatch<React.SetStateAction<boolean>>;
  waitingNr: number | null;
}

const PreloadImg = (props: PropsTypes): JSX.Element => {
  const [preloadImages, setPreloadImages] = useState<any>([]);

  //store
  const imgPrevCurrNext = useGalStore((state) => state.imgPrevCurrNext);
  const loadedImages = useGalStore((state) => state.loadedImages);
  const setLoadedImages = useGalStore((state) => state.setLoadedImages);

  useEffect(() => {
    if (
      Object.keys(imgPrevCurrNext).length > 0 &&
      loadedImages[imgPrevCurrNext.curr]
    ) {
      //check if images of prev and next are already loaded and set props for preloading
      const checkLoad = () => {
        let preload = [imgPrevCurrNext.prev, imgPrevCurrNext.next];
        const length = Object.keys(loadedImages).length;

        for (let i = 0; i < length; i++) {
          if (
            imgPrevCurrNext.prev === Number(Object.keys(loadedImages)[i])
          ) {
            preload.shift();
          }
          if (
            imgPrevCurrNext.next === Number(Object.keys(loadedImages)[i])
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
  }, [imgPrevCurrNext, loadedImages[imgPrevCurrNext.curr]]);

  const handleLoaded = (num: any) => {
    if (!loadedImages[num]) {
      setLoadedImages({ ...loadedImages, [num]: true });
      if (props.waitingNr === Number(num)) {
        props.setLoadingAnim(false);
      }
    }
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
