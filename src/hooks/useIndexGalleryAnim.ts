import { useLayoutEffect, useContext } from "react";
import { gsap } from "gsap/all";
import Splitting from "splitting";
import AnimContext from "../context/AnimContext";
import { useWindowSize } from "./useStore";

interface PropsTypes {
  background: string;
  paintings: string;
  text: string;
  arrow: string;
  wrapper: unknown;
  container: string;
}

const useIndexGalleryAnim = (props: PropsTypes): void => {
  //store
  const mobile = useWindowSize((state) => state.mobile);

  //for checking if scrollSmoother is set
  const smootherOk = useContext(AnimContext).smootherOk;

  useLayoutEffect(() => {
    if (smootherOk) {
      let ctx: gsap.Context = gsap.context(() => {
        const tl: gsap.core.Timeline = gsap.timeline({
          scrollTrigger: {
            trigger: props.container,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
              return mobile ? "" : tl.timeScale(1.0);
            },
            onEnterBack: () => {
              return mobile ? "" : tl.timeScale(1.0);
            },
            onLeaveBack: () => {
              return mobile ? "" : tl.timeScale(5.0).reverse();
            },
            onLeave: () => {
              return mobile ? "" : tl.timeScale(5.0).reverse();
            },
            // markers: true,
            toggleActions: mobile ? "" : "play reverse play reverse",
          },
        });
        Splitting({
          target: props.text,
          by: "chars",
          key: "indexGall",
        });

        const images: HTMLDivElement[] = gsap.utils.toArray(props.paintings);

        tl.to(props.background, {
          scale: 1,
          autoAlpha: 1,
          duration: 0.5,
        });
        tl.to(props.paintings, {
          autoAlpha: 1,
          duration: 0.3,
          stagger: 0.2,
        });
        images.forEach((panel, i) => {
          tl.to(panel as HTMLElement, {
            rotate: i === 0 ? "-10" : i === 1 ? "15" : i === 2 ? "10" : "",
            duration: 0.5,
          });
        });
        tl.to(
          ".word",
          {
            autoAlpha: 1,
            duration: 0,
          },
          1.5
        );
        tl.to(
          ".char",
          {
            autoAlpha: 1,
            duration: 0.2,
            stagger: 0.03,
          },
          ">"
        );
        tl.to(
          props.arrow,
          {
            autoAlpha: 1,
            duration: 0.2,
          },
          ">"
        );

        if (mobile) {
          tl.progress(1);
        }
      }, (props.wrapper as any).current);

      return () => ctx.revert(); // <- CLEANUP!
    }
  }, [smootherOk]);
};

export default useIndexGalleryAnim;
