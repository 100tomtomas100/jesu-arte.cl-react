import { useLayoutEffect } from "react"
import gsap from "gsap"

const useFooterAnim = ({wrapper, animate}:{wrapper: string, animate: string} ): void => {
    useLayoutEffect(() => {
        const tl: gsap.core.Timeline = gsap.timeline({
          scrollTrigger: {
            trigger: `.${wrapper}`,
            start: "center bottom",
            toggleActions: "play none none reverse",
            onEnter: () => {
              tl.timeScale(1.0);
            },
            onEnterBack: () => {
              tl.timeScale(1.0);
            },
            onLeaveBack: () => {
              tl.timeScale(5.0).reverse();
            },
          },
        });
        let ctx: gsap.Context = gsap.context(() => {
            tl.to(`.${animate}`, {
                autoAlpha: 1,
                x: 0,
                duration: 0.7,
                stagger: 0.1

            })
        }, `.${wrapper}`);

        return () => ctx.revert()
     
 },[])
}

export default useFooterAnim 