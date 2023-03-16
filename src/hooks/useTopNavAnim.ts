import { useLayoutEffect, useContext} from "react";
import { gsap } from "gsap";
import AnimContext from "../context/AnimContext";

interface PropsTypes {
  navLink: string;
  navbar: string;
  wrapper: unknown;
}

const useTopNavAnim = (props: PropsTypes) => {
  //for checking if scrollSmoother is set
  const smootherOk = useContext(AnimContext);

  useLayoutEffect(() => {
    if (smootherOk) {
      let ctx: gsap.Context = gsap.context(() => {
        const tl: gsap.core.Timeline = gsap.timeline({
          scrollTrigger: {
            trigger: props.navbar,
            start: "center top",
            toggleActions: "reverse none none play",
          }
        });

        tl.to(props.navLink, {
          x: "0",
          autoAlpha: 1,
          duration: 1,
          stagger: 0.2,
          delay: 0.2,
        });
        tl.play();
      }, (props.wrapper as any).current);
      return () => ctx.revert();
    }
  }, [smootherOk]);
};
export default useTopNavAnim;
