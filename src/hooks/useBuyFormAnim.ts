import React from "react";
import { useLayoutEffect, useContext } from "react";
import { gsap } from "gsap/all";
import AnimContext from "../context/AnimContext";

interface PropsTypes {
  container: React.RefObject<HTMLDivElement>;
  anim: string;
}

const useBuyFormAnim = (props: PropsTypes) => {
  //for checking if scrollSmoother is set
  const smootherOk = useContext(AnimContext).smootherOk;
  useLayoutEffect(() => {
    if (smootherOk) {
      let ctx: gsap.Context = gsap.context(() => {
          const tl: gsap.core.Timeline = gsap.timeline({});
          tl.from(props.anim, {
              autoAlpha: 0,
              scale: 0,
              duration: 0.5,
            //   stagger:0.1
          })
      }, (props.container as any).current);

      return () => ctx.revert(); // <- CLEANUP!
    }
  }, [smootherOk]);
};

export default useBuyFormAnim;
