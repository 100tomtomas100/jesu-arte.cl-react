import { useLayoutEffect, useContext } from "react";
import { gsap } from "gsap/all";
import AnimContext from "../context/AnimContext";

interface PropsTypes {
  items: string;
  buttons: string;
  totals: string;
  container: React.RefObject<HTMLDivElement>;
}

const useShoppingCartAnim = (props: PropsTypes) => {
  //for checking if scrollSmoother is set
  const smootherOk = useContext(AnimContext).smootherOk;
  useLayoutEffect(() => {
    if (smootherOk) {
      let ctx: gsap.Context = gsap.context(() => {
        const tl: gsap.core.Timeline = gsap.timeline({});
        tl.from(props.items, {
          autoAlpha: 0,
          scale: 0,
          duration: 0.5,
          stagger: 0.2,
        });
        tl.from(props.buttons, {
          autoAlpha: 0,
          scale: 0,
          duration: 0.5,
          stagger: 0.2,
        },0);
        tl.from(props.totals, {
          autoAlpha: 0,
          scale: 0,
          duration: 0.5,
          stagger: 0.2,
        },0);
      }, (props.container as any).current);

      return () => ctx.revert(); // <- CLEANUP!
    }
  }, [smootherOk]);
};
export default useShoppingCartAnim;
