import gsap from "gsap";
import { useEffect } from "react";

interface PropsTypes {
  loaded: boolean;
  wrapper: unknown;
  images: string;
}

const useGalleryAnim = (props: PropsTypes) => {
  useEffect(() => {
      if (props.loaded) {      
        let ctx: gsap.Context = gsap.context(() => {
          const tl: gsap.core.Timeline = gsap.timeline({
          });

          tl.to(props.images, {
            // stagger: 0.1,
            scale: 1,
            duration: 0.7,
            autoAlpha: 1,
          });
        }, (props.wrapper as any).current);
        return () => ctx.revert(); // <- CLEANUP!
     
    }
  }, [props.loaded]);
};
export default useGalleryAnim;
