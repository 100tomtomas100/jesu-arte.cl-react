import { useLayoutEffect, useState } from "react";
import doorsOpen from "../utils/svg/doorsOpen";
import gsap from "gsap";

interface PropsTypes {
  doorsRef: SVGPathElement | null;
  doorsClass: string;
  hovered: boolean;
}
const useOpenDoorsAnim = (props: PropsTypes): void => {
  //Doors animation. Timeline setup
  const [openDoors, setOpenDoors] = useState<gsap.core.Timeline>(
    gsap.timeline({ paused: true })
  );
  //Doors animation. Place animation in timeline
  useLayoutEffect(() => {
    let ctx: gsap.Context = gsap.context(() => {
      if (props.doorsRef) {
        setOpenDoors(
          openDoors.to(props.doorsRef, {
            morphSVG: doorsOpen.props.d,
            duration: 1,
          })
        );
      }
    }, props.doorsClass);

    return () => ctx.revert();
  }, [props.doorsRef]);

  //Doors animation. Start animation on hover
  useLayoutEffect(() => {
    if (props.hovered === false) {
      openDoors.reverse();
    }
    if (props.hovered === true) {
      openDoors.play();
    }
  }, [props.hovered]);
};

export default useOpenDoorsAnim;
