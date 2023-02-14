import { useLayoutEffect } from "react";
import Splitting from "splitting";
import gsap from "gsap";
import title from "../utils/svg/title";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

interface propsTypes {
  titleSvgRef: SVGPathElement | null;
  title: string;
  text: string;
  reviews: string;
  scope: string;
}
const useReviewsAnim = (props: propsTypes) => {
  useLayoutEffect(() => {
    const tl: gsap.core.Timeline = gsap.timeline({
      scrollTrigger: {
        trigger: `.${props.scope}`,
        onEnter: () => {
          tl.timeScale(1.0);
        },

        onLeaveBack: () => {
          tl.timeScale(5.0).reverse();
        },

        start: "top center",
        end: "bottom center",
        // markers: true,
        toggleActions: "play none none reverse",
      },
    });

    Splitting({
      target: `.${props.text}`,
      by: "words",
      key: "reviews",
    });

    let ctx: gsap.Context = gsap.context(() => {
      tl.to(`.${props.title}`, {
        scale: 1,
        autoAlpha: 1,
        duration: 1,
      });
      if (props.titleSvgRef) {
        tl.to(props.titleSvgRef, { morphSVG: title.props.d, duration: 1.5 }, 0.3);
      }
      tl.to(
        ".word",
        {
          autoAlpha: 1,
          duration: 1,
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
    }, `.${props.scope}`);
    return () => ctx.revert();
  }, [props.titleSvgRef]);
};

export default useReviewsAnim;
