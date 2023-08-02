import { gsap } from "gsap";
import { useLayoutEffect, useContext } from "react";
import AnimContext from "../context/AnimContext";


interface PropsTypes {
  wrapper: unknown;
  nav: string;
  links: string;
}

const useSideNavAnim = (props:PropsTypes ) => {
  
  //for checking if scrollSmoother is set
  const smootherOk = useContext(AnimContext);

  useLayoutEffect(() => {
    if (smootherOk) {
      const tl: gsap.core.Timeline = gsap.timeline({
        scrollTrigger: {
          trigger: `.${props.nav}`,
          start: "center 45%",
          toggleActions: "play none none reverse",
        },
      });

      let ctx: gsap.Context = gsap.context(() => {
        tl.to(`.${props.nav}`, {
          autoAlpha: 1,
          duration: 0.3,
        });
        tl.to(`.${props.links}`, {
          autoAlpha: 1,
          duration: 0.2,
          stagger: 0.1,
        });
      }, (props.wrapper as any).current);
      return () => ctx.revert();
    }
  }, [smootherOk]);
};

export default useSideNavAnim;
