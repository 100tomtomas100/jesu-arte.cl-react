import mobileNavX from "../utils/svg/mobileNavX";
import gsap from "gsap";
import { useLayoutEffect, useState } from "react";

interface PropsTypes {
  barRef: unknown;
  showNav: boolean;
  navLink: string;
  navScope: string;
}

//NavBar animation. Timeline setup
const navAnim = gsap.timeline({ paused: true });

const useMobileNavBarAnim = ({
  barRef,
  showNav,
  navLink,
  navScope,
}: PropsTypes): void => {
    
  //NavBar animation. Place animation in timeline
  useLayoutEffect(() => {
    if (barRef) {
      let ctx: gsap.Context = gsap.context(() => {
        navAnim.to((barRef as any).current, {
          morphSVG: mobileNavX.props.d,
          duration: 0.5,
        });
        navAnim.to(
          `.${navLink}`,
          {
            y: "0",
            duration: 0.5,
            stagger: -0.1,
          },
          "<"
        );
      }, `.${navScope}`);

      return () => ctx.revert();
    }
  }, [barRef]);

  //NavBar animation. Start animation on click
  useLayoutEffect(() => {
    if (showNav === true) {
      navAnim.play();
    }
    if (showNav === false) {
      navAnim.reverse();
    }
  }, [showNav]);
};

export default useMobileNavBarAnim;
