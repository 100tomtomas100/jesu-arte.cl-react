import mobileNavX from "../utils/svg/mobileNavX";
import gsap from "gsap";
import { useLayoutEffect, useContext } from "react";
import AnimContext from "../context/AnimContext";
import { useMobileNavStore } from "./useStore";

interface PropsTypes {
  barRef: unknown;
  navLink: string;
  navScope: unknown;
}

//NavBar animation. Timeline setup
let navAnim: gsap.core.Timeline = gsap.timeline({ paused: true });

const useMobileNavBarAnim = ({
  barRef,
  // showNav,
  navLink,
  navScope,
}: PropsTypes): void => {
  //for checking if scrollSmoother is set
  const smootherOk = useContext(AnimContext);

  //store 
  const setShowMobileNav = useMobileNavStore((state) => state.setShowMenu);
  const showMobileNav = useMobileNavStore((state) => state.showMenu);


  //NavBar animation. Place animation in timeline
  useLayoutEffect(() => {
    if (barRef && smootherOk) {
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
      }, (navScope as any).current);

      return () => ctx.revert();
    }
  }, [barRef, smootherOk]);

  //NavBar animation. Start animation on click
  useLayoutEffect(() => {
    if (showMobileNav === true) {
      navAnim.play();
    }
    if (showMobileNav === false) {
      navAnim.reverse();
    }
  }, [showMobileNav]);
};

export default useMobileNavBarAnim;
