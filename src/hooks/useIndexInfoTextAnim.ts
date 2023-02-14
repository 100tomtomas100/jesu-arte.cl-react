import { useLayoutEffect } from "react";
import Splitting from "splitting";
import { gsap } from "gsap";
const useIndexInfoTextAnim = (
  text: string,
  textWrapper: string,
  image: string,
  mobile: string
): void => {
  useLayoutEffect(() => {
    const tl: gsap.core.Timeline = gsap.timeline({
      scrollTrigger: {
        trigger: textWrapper,
        start: "bottom center",
        onEnter: () => {
          tl.timeScale(5.0).reverse();
        },
        onLeaveBack: () => {
          tl.timeScale(1.0);
        },
        // markers: true,
        toggleActions: "reverse none none play",
      },
    });

    tl.play();

    Splitting({
      target: text,
      by: "words",
    });
    let ctx: gsap.Context = gsap.context(() => {
      tl.to(".word", {
        autoAlpha: 1,
        duration: 1.5,
        ease: "sine",
        stagger: 0.05,
      });
      tl.to(
        image,
        {
          scale: 1,
          autoAlpha: mobile === "true" ? 0.8 : 1,
          duration: 1,
          rotate: -10,
        },
        "<"
      );
    }, textWrapper);
    return () => ctx.revert();
  }, [mobile]);
};

export default useIndexInfoTextAnim;
