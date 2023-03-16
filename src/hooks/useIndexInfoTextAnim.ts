import { useLayoutEffect, useContext } from "react";
import Splitting from "splitting";
import { gsap } from "gsap";
import AnimContext from "../context/AnimContext";

interface PropsTypes {
  text?: string;
  textWrapper?: unknown;
  image?: string;
  mobile?: string;
  container?: string
}

const useIndexInfoTextAnim = ({
  text,
  textWrapper,
  image,
  mobile,
  container
}: PropsTypes): void => {
  //for checking if scrollSmoother is set
  const smootherOk = useContext(AnimContext);

  useLayoutEffect(() => {
    const split: Splitting.Result = Splitting({
      target: text,
      by: "words",
    });
    if (smootherOk) {
      let ctx: gsap.Context = gsap.context(() => {
        const tl: gsap.core.Timeline = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "bottom center",
            toggleActions: "reverse none none play",
            onEnter: () => {
              tl.timeScale(5.0).reverse();
            },
            onLeaveBack: () => {
              tl.timeScale(1.0);
            },
            // markers: true,
          },
        });

        tl.to((split[0] as any).words, {
          autoAlpha: 1,
          duration: 1.5,
          ease: "sine",
          stagger: 0.05,
        });
        tl.to(
          image as string,
          {
            scale: 1,
            autoAlpha: mobile === "true" ? 0.8 : 1,
            duration: 1,
            rotate: -10,
          },
          "<"
        );

        tl.play();
      }, (textWrapper as any).current);
      return () => ctx.revert();
    }
  }, [smootherOk, mobile]);
};

export default useIndexInfoTextAnim;
