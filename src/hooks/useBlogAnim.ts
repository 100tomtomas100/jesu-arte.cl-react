import gsap from "gsap";
import { useLayoutEffect, useState } from "react";
import { useBlogStore } from "./useStore";

interface PropsTypes {
  containerWrapperRef: React.MutableRefObject<HTMLDivElement | null>;
  postClass: string;
  loaded: boolean;
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const useBlogAnim = (props: PropsTypes) => {
  const [blogNum, setBlogNum] = useState<number>(0);

  //store
  const postsToLoad = useBlogStore((state) => state.postsToLoad);

  useLayoutEffect(() => {
    if (props.loaded && blogNum < postsToLoad) {

      //list of posts to animate
      let toShow: string[] = [];
      for (let i = blogNum; i < postsToLoad; i++) {
        toShow.push(`${props.postClass}${i}`);
      }

      const afterAnim = () => {
        props.setLoaded(false);
        setBlogNum(blogNum + 2);
      };

      let ctx: gsap.Context = gsap.context(() => {
        const tl: gsap.core.Timeline = gsap.timeline({});
        tl.from(toShow, {
          stagger: 0.2,
          scale: 0,
          duration: 0.7,
          autoAlpha: 0,
          onComplete: afterAnim,
        });
      }, (props.containerWrapperRef as any).current);

      return () => ctx.revert(); // <- CLEANUP!
    }
  }, [props.loaded]);
};
export default useBlogAnim;
