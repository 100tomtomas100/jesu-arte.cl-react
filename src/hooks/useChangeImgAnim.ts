import { useLayoutEffect} from "react";
import gsap from "gsap";
import Splitting from "splitting";
import useGalStore from "./useStore";

interface Props {
  currentImg?: string;
  currentImg2?: string;
  wrapper?: unknown;
  setCurrKey?: React.Dispatch<React.SetStateAction<number>>;
  currKey?: any;
  imgShowing?: string;
  loadedImg?: any;
}
const useChangeImgAnim = (props: Props): void => {

  //store
  const splitImg = useGalStore((state) => state.splitImg)
  const setSplitImg = useGalStore((state) => state.setSplitImg);
  const loadedImages = useGalStore((state) => state.loadedImages);
   const largeGalAnimRunning = useGalStore((state) => state.largeGalAnimRunning);
   const setLargeGalAnimRunning = useGalStore(
     (state) => state.setLargeGalAnimRunning
   );
   const imgPrevCurrNext = useGalStore((state) => state.imgPrevCurrNext);

  useLayoutEffect(() => {
    if (
      props.currentImg &&
      props.wrapper &&
      props.currKey &&
      props.imgShowing &&
      loadedImages[imgPrevCurrNext[props.imgShowing as string]] ===
        true &&
      largeGalAnimRunning
    ) {
      let split: Splitting.Result = Splitting({
        target:
          props.imgShowing === "curr" ? props.currentImg : props.currentImg2,
        by: "cells",
        image: true,
        rows: 9,
        columns: 9,
      });
      const resetContainer = () => {
        if (props.setCurrKey) {
          if (props.imgShowing === "curr2") {
            props.setCurrKey({
              ...props.currKey,
              curr: props.currKey.curr + 1,
            });
          }
          if (props.imgShowing === "curr") {
            props.setCurrKey({
              ...props.currKey,
              curr2: props.currKey.curr2 - 1,
            });
          }
        }
      };
      const resetSplitImg = () => {

        setSplitImg(split);
        setTimeout(() => {
          setLargeGalAnimRunning(false);
        }, 0);
         
      };
      let tl: gsap.core.Timeline;
     
      let ctx: gsap.Context = gsap.context(() => {
        tl = gsap.timeline({});

        if (splitImg && split) {
          tl.to((splitImg[0] as any).cells, {
            autoAlpha: 0,
            scale: 0,
            duration: 0.1,
            ease: "power4.in",
            onComplete: resetContainer,
            stagger: {
              each: 0.08,
              from: "center",
              grid: [9, 9],
            },
          });

          tl.from(
            (split[0] as any).cells,
            {
              autoAlpha: 0,
              scale: 0,
              duration: 0.1,
              ease: "power4.in",
              onComplete: resetSplitImg,
              stagger: {
                each: 0.08,
                from: "center",
                grid: [9, 9],
              },
            },
            "<"
          );
        }
      }, (props.wrapper as any).current);

      return () => {
        ctx.revert(); // <- CLEANUP!
      };
      
    }
  }, [
    props.imgShowing,
  ]);
};

export default useChangeImgAnim;
