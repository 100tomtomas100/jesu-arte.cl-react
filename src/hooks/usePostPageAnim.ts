import gsap from "gsap";
import { useLayoutEffect } from "react";

interface usePostPageAnimProps {
  containerWrapperRef: React.RefObject<HTMLDivElement>;
  containerClass: string;
  loaded: boolean;
}

const usePostPageAnim = (props: usePostPageAnimProps) => {
  useLayoutEffect(() => {
    if(props.loaded){
      let ctx: gsap.Context = gsap.context(() => {
        const tl: gsap.core.Timeline = gsap.timeline({});
        tl.from(props.containerClass, {
          stagger: 0.2,
          scale: 0,
          duration: 0.7,
          autoAlpha: 0,
        });
      }, (props.containerWrapperRef as any).current);

      return () => ctx.revert(); // <- CLEANUP!
    }
  }, [props.loaded]);
};

export default usePostPageAnim;
