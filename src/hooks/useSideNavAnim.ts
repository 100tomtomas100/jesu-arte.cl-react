import { gsap } from "gsap";
import {  useLayoutEffect } from "react";

const useSideNavAnim = (props: {[key: string]: string}) => {
  useLayoutEffect(() => {
      const tl: gsap.core.Timeline = gsap.timeline({
        scrollTrigger: {
          trigger: `.${props.wrapper}`,
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
      }, `.${props.wrapper}`);
      return () => ctx.revert(); 
    
  }, []);

};

export default useSideNavAnim;
