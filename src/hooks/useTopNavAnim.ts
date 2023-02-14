import { useLayoutEffect} from "react";
import { gsap } from "gsap";

const useTopNavAnim = (props: { [key: string]: string }) => {
 
  useLayoutEffect(() => {
      const tl: gsap.core.Timeline = gsap.timeline({
        scrollTrigger: {
          trigger: props.navbar,
          start: "center top",
          toggleActions: "reverse none none play",
        },
      });
      let ctx: gsap.Context = gsap.context(() => {
        tl.to(props.navLink, {
          x: "0",
          autoAlpha: 1,
          duration: 1,
          stagger: 0.2,
          delay: 0.2,
        });
      }, props.navbar);
      tl.play()
      return () => ctx.revert();
  }, []);
};
export default useTopNavAnim;
