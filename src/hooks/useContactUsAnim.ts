import React, { useLayoutEffect } from "react";
import gsap  from "gsap";

interface PropsTypes {
  containerWrapperRef: React.MutableRefObject<HTMLDivElement | null>;
  containerClass: string;
}

const useContactUsAnim = (props: PropsTypes) => {
  useLayoutEffect(() => {
    let ctx: gsap.Context = gsap.context(() => {
      const tl: gsap.core.Timeline = gsap.timeline({});
        tl.from(props.containerClass, {
          stagger: 0.2,
        scale: 0,
        duration: 0.7,
        autoAlpha: 0,
      });
    }, (props.containerWrapperRef as any).current);

    return () => ctx.revert(); // <- CLEANUP!
  }, []);
};

export default useContactUsAnim;
