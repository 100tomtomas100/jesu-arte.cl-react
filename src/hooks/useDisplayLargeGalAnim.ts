import { useLayoutEffect } from "react";
import Splitting from "splitting";
import gsap from "gsap";
import useGalStore from "./useStore";

interface PropsTypes {
  clickedImgClass?: string;
  wrapper?: unknown;
  background?: string;
  clickedImgLoaded?: boolean;
  setCurrKey?: React.Dispatch<
    React.SetStateAction<{
      curr: number;
      curr2: number;
    }>
  >;
  currKey?: {
    curr: number;
    curr2: number;
  };
  imgShowing?: string;
  setImgShowing?: React.Dispatch<React.SetStateAction<string>>;
}
gsap.registerPlugin(gsap);

const useDisplayLargeGalAnim = (props: PropsTypes): void => {
  
  //store
  const setImgPrevCurrNext = useGalStore((state) => state.setImgPrevCurrNext);
  const largeGalOn = useGalStore((state) => state.largeGalOn);
  const splitImg = useGalStore((state) => state.splitImg);
  const setSplitImg = useGalStore((state) => state.setSplitImg);
  const setLargeGalAnimRunning = useGalStore(
    (state) => state.setLargeGalAnimRunning
  );

  //animation for closing large gallery
  useLayoutEffect(() => {
    if (!largeGalOn && splitImg && props.wrapper && !largeGalOn) {
      let ctx: gsap.Context = gsap.context(() => {
        //reset the overflow of body for navigation
        document.body.style.overflow = "unset";

        //after gallery is closed update or reset values
        const resetContainer = () => {
          //update key values
          if (props.setCurrKey && props.currKey) {
            if (props.imgShowing === "curr") {
              props.setCurrKey({
                ...props.currKey,
                curr: props.currKey.curr + 1,
              });
            }
            if (props.imgShowing === "curr2") {
              props.setCurrKey({
                ...props.currKey,
                curr2: props.currKey.curr2 - 1,
              });
            }
          }
          //reset values
          if (props.setImgShowing) {
            props.setImgShowing("curr");
            setImgPrevCurrNext({});
          }

          setSplitImg(null);
          setLargeGalAnimRunning(false);
        };

        //new timeline
        const tl: gsap.core.Timeline = gsap.timeline({});
        //set animation for the last split image
        tl.to((splitImg as any)[0].cells, {
          autoAlpha: 0,
          scale: 0.1,
          duration: 0.1,
          ease: "power4.in",
          stagger: {
            each: 0.04,
            from: "edges",
            grid: [9, 9],
          },
        });
        tl.to(props.background as string, {
          autoAlpha: 0,
          duration: 0.3,
          onComplete: resetContainer,
        });
      }, (props.wrapper as any).current);

      //only clean when gallery is opening otherwise background animation will not run when opening 2nd time
      if (largeGalOn) {
        return () => ctx.revert(); // <- CLEANUP!
      }
    }

    //animation for opening large gallery
    if (
      props.clickedImgClass &&
      props.wrapper &&
      props.background &&
      largeGalOn
    ) {
      let ctx: gsap.Context = gsap.context(() => {
        if (largeGalOn && props.clickedImgLoaded) {
          //split img into cells
          const split: Splitting.Result = Splitting({
            target: props.clickedImgClass,
            by: "cells",
            image: true,
            rows: 9,
            columns: 9,
          });

          //reset split img
          setSplitImg(split);
          //hide body overflow disabling navigation and visibility of all except large gallery
          const hideOverflow = () => {
            document.body.style.overflow = "hidden";
            setLargeGalAnimRunning(false);
          };
          //new timeline
          const tl: gsap.core.Timeline = gsap.timeline({});
          tl.to(props.background as string, {
            autoAlpha: 1,
            duration: 0.7,
          });

          tl.from((split[0] as any).cells, {
            autoAlpha: 0,
            scale: 0.1,
            duration: 0.1,
            ease: "power4.in",
            onComplete: hideOverflow,
            stagger: {
              each: 0.08,
              from: "center",
              grid: [9, 9],
            },
          });
        }
      }, (props.wrapper as any).current);
      //only clean when gallery is closing otherwise background animation will not run when closing
      if (!largeGalOn) {
        return () => ctx.revert(); // <- CLEANUP!
      }
    }
  }, [largeGalOn, props.clickedImgLoaded]);
};

export default useDisplayLargeGalAnim;
