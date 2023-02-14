import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "gsap/all";
import Splitting from "splitting";

gsap.registerPlugin(ScrollTrigger);

interface PropsTypes {
  background: string;
  paintings: string;
  text: string;
  arrow: string;
  gallery: string;
}

const useIndexGalleryAnim = (props: PropsTypes): void => {

  useLayoutEffect(() => {
    const tl: gsap.core.Timeline = gsap.timeline({
      scrollTrigger: {
        trigger: props.gallery,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          tl.timeScale(1.0);
        },
        onEnterBack: () => {
          tl.timeScale(1.0);
        },
        onLeaveBack: () => {
          tl.timeScale(5.0).reverse();
        },
        onLeave: () => {
          tl.timeScale(5.0).reverse();
        },
        // markers: true,
        toggleActions: "play reverse play reverse",
      },
    });
    Splitting({
      target: props.text,
      by: "chars",
      key: "indexGall",
    });
    let ctx: gsap.Context = gsap.context(() => {
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
    }, props.gallery);
    return () => ctx.revert(); // <- CLEANUP!
  }, []);
};

export default useIndexGalleryAnim;
