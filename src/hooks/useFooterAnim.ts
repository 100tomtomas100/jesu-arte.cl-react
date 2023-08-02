import { useLayoutEffect, useContext } from "react";
import gsap from "gsap";
import AnimContext from "../context/AnimContext";

const useFooterAnim = ({
  wrapper,
  animate,
  container,
}: {
  wrapper: unknown;
  animate: string;
  container: string;
}): void => {
  //for checking if scrollSmoother is set
  const {smootherOk, setFooterTimeline } = useContext(AnimContext);

  useLayoutEffect(() => {
    if (smootherOk) {
      
      let ctx: gsap.Context = gsap.context(() => {
        const tl: gsap.core.Timeline = gsap.timeline({
          scrollTrigger: {
            trigger: `.${container}`,
            start: "center bottom",
            toggleActions: "play reverse play reverse",
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
            // markers: true
          },
        });
        
        setFooterTimeline(tl)

        tl.to(`.${animate}`, {
          autoAlpha: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.1,
        });
      }, (wrapper as any).current);

      return () => ctx.revert();
    }
  }, [smootherOk]);
};

export default useFooterAnim;
