import { useLayoutEffect, useContext } from "react";
import Splitting from "splitting";
import gsap from "gsap";
import title from "../utils/svg/title";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import AnimContext from "../context/AnimContext";
import { useWindowSize } from "./useStore";

gsap.registerPlugin(MorphSVGPlugin);

interface propsTypes {
  titleSvgRef: SVGPathElement | null;
  title: string;
  text: string;
  reviews: string;
  scope: unknown;
  container: string;
}
const useReviewsAnim = (props: propsTypes) => {
  //store
  const mobile = useWindowSize((state) => state.mobile);

  //for checking if scrollSmoother is set
  const smootherOk = useContext(AnimContext);

  useLayoutEffect(() => {
    if (smootherOk) {
      let ctx: gsap.Context = gsap.context(() => {
        const tl: gsap.core.Timeline = gsap.timeline({
          scrollTrigger: {
            trigger: props.container,
            onEnter: () => {
              return mobile? "":tl.timeScale(1.0);
            },

            onLeaveBack: () => {
              return mobile ? "" : tl.timeScale(5.0).reverse();
            },

            start: "top center",
            end: "bottom center",
            // markers: true,
            toggleActions: mobile? "":"play none none reverse",
          },
        });

        const split = Splitting({
          target: `.${props.text}`,
          by: "words",
          key: "reviews",
        });

        tl.to(`.${props.title}`, {
          scale: 1,
          autoAlpha: 1,
          duration: 1,
        });
        if (props.titleSvgRef) {
          tl.to(
            props.titleSvgRef,
            { morphSVG: title.props.d, duration: 1.5 },
            0.3
          );
        }
        tl.to(
          (split[0] as any).words,
          {
            autoAlpha: 1,
            duration: 1.5,
            stagger: 0.006,
          },
          0
        );
        tl.to(
          `.${props.reviews}`,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1,
          },
          ">-1"
        );
        if (mobile) {
          tl.progress(1);
        }
      }, (props.scope as any).current);
    return () => ctx.revert();
    }
  }, [props.titleSvgRef, smootherOk]);
};

export default useReviewsAnim;
