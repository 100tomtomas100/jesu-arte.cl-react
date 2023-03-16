import { useLayoutEffect, useState } from "react";
import gsap from "gsap";
import Splitting from "splitting";

interface Props {
  splitImg?: Splitting.Result | null;
  setSplitImg?: React.Dispatch<React.SetStateAction<Splitting.Result | null>>;
  imgPrevCurrNext?: { [key: string]: number };
  currentImg?: string;
  currentImg2?: string;
  wrapper?: unknown;
  setCurrKey?: React.Dispatch<React.SetStateAction<number>>;
  currKey?: any;
  imgShowing?: string;
  loadedImg?: any;
  loadedImages?: any;
  animInAction?: boolean;
  setAnimInAct?: any;
}
const useChangeImgAnim = (props: Props): void => {

  useLayoutEffect(() => {
    if (
      props.splitImg &&
      props.setSplitImg &&
      props.imgPrevCurrNext &&
      props.currentImg &&
      props.wrapper &&
      props.currKey &&
      props.imgShowing &&
      // (props.currentImg2 as any).current.getElementsByTagName("img").length > 0 &&
      props.loadedImages[props.imgPrevCurrNext[props.imgShowing as string]] ===
        true &&
      !props.animInAction
    ) {

      let split: Splitting.Result = Splitting({
        target:
          props.imgShowing === "curr"
            ? props.currentImg 
            : props.currentImg2,
        // (props.currentImg2 as any).current,
        by: "cells",
        image: true,
        rows: 12,
        columns: 12,
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
          props.setAnimInAct(false);
        }
      };
      const resetSplitImg = () => {
        if (props.setSplitImg) {
          props.setSplitImg(split);
        }
      };
      let tl: gsap.core.Timeline;

      // setTimeout(() => {
      // if (lastAnimFinished) {
      //   setLastAnimFinished(false)
      //   console.log("before groo true");
      // }
      // if (!lastAnimFinished) {
      //     console.log("before groo false")
      //     resetContainer();
      //     resetSplitImg();
      //     setLastAnimFinished(true);
      //   }
      // if (lastAnimFinished) {
      console.log("groooo");
      let ctx: gsap.Context = gsap.context(() => {
        tl = gsap.timeline({});
        // let split: Splitting.Result = Splitting({
        //   target:
        //     props.imgShowing === "curr"
        //       ? (props.currentImg as any).current
        //       : (props.currentImg2 as any).current,
        //   // (props.currentImg2 as any).current,
        //   by: "cells",
        //   image: true,
        //   rows: 12,
        //   columns: 12,
        // });
        // console.log(split)
        // const resetSplitImg = () => {
        //   if (props.setSplitImg) {
        //     props.setSplitImg(split);
        //   }
        // };

        // const resetContainer = () => {
        //   if (props.setCurrKey) {
        //     if (props.imgShowing === "curr2") {
        //       props.setCurrKey({
        //         ...props.currKey,
        //         curr: props.currKey.curr + 1,
        //       });
        //     }
        //     if (props.imgShowing === "curr") {
        //       props.setCurrKey({
        //         ...props.currKey,
        //         curr2: props.currKey.curr2 - 1,
        //       });
        //     }

        //     setImgGone(true);
        //   }
        // };

        if (props.splitImg) {
          tl.to((props.splitImg[0] as any).cells, {
            //   tl.to(".cell", {
            autoAlpha: 0,
            scale: 0,
            duration: 0.1,
            ease: "power4.in",
            onComplete: resetContainer,
            // onInterrupt: resetContainer,
            stagger: {
              each: 0.08,
              from: "center",
              // axis: "x",
              grid: [12, 12],
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
              // onInterrupt: resetSplitImg,
              stagger: {
                each: 0.08,
                from: "center",
                grid: [12, 12],
              },
            },
            "<"
          );
        }
      }, (props.wrapper as any).current);

      return () => {
        // resetContainer()
        // resetSplitImg()
        // tl.kill()
        ctx.revert(); // <- CLEANUP!
      };
      // }
      // }, 0);
    }
  }, [
    props.imgShowing,
    // props.imgPrevCurrNext
  ]);
};

export default useChangeImgAnim;
