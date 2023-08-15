import IndexInfoText from "../components/AboutUs/IndexInfoText";
import { useEffect, useLayoutEffect, useState, useContext } from "react";
import { ScrollTrigger } from "gsap/all";
import IndexGallery from "../components/AboutUs/IndexGallery";
import InfoReviews from "../components/AboutUs/InfoReviews";
import gsap from "gsap";
import AnimContext from "../context/AnimContext";
import { useWindowSize} from "../hooks/useStore";

const AboutUs = (): JSX.Element => {
  const { footerTimeline } = useContext(AnimContext)
  //store
  const windowWidth = useWindowSize((set)=> set.width)

  useEffect(() => {
    if (footerTimeline) {
      footerTimeline.scrollTrigger.refresh()
    }
  }, [footerTimeline])

  useLayoutEffect(() => {
    if (windowWidth > 600) {
      let ctx: gsap.Context = gsap.context(() => {
        const panelArr: HTMLDivElement[] = gsap.utils.toArray(".PanelPin");
        panelArr.forEach((panel, i) => {
          ScrollTrigger.create({
            trigger: panel,
            start: windowWidth > 600 ? "top top" : "top 10%",
            pin: true,
            end: panelArr.length - 1 === i ? "+=500" : "",
            pinSpacing: panelArr.length - 1 === i ? "500" : false,
            // snap: 1 / ([panel].length - 1),
          });
        });
      }, "#App");
      return () => ctx.revert();
    }
  }, [windowWidth]);

  return (
    <div>
      <div className="PanelPin">
        <IndexInfoText />
      </div>

      <div className="PanelPin">
        <IndexGallery />
      </div>

      <div className="PanelPin">
        <InfoReviews />
      </div>
    </div>
  );
};

export default AboutUs;
