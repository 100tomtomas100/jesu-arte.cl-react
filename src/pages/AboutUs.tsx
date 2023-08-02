import IndexInfoText from "../components/AboutUs/IndexInfoText";
import { useEffect, useLayoutEffect, useState, useContext } from "react";
import { ScrollTrigger } from "gsap/all";
import IndexGallery from "../components/AboutUs/IndexGallery";
import InfoReviews from "../components/AboutUs/InfoReviews";
import gsap from "gsap";
import getWindowWidth from "../utils/getWindowWidth";
import AnimContext from "../context/AnimContext";

const AboutUs = (): JSX.Element => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const { footerTimeline } = useContext(AnimContext)
  useEffect(() => {
    if (footerTimeline) {
      footerTimeline.scrollTrigger.refresh()
    }
  }, [footerTimeline])

  useEffect(() => {
    const handleResize = (): void => {
      setWindowWidth(getWindowWidth());
    };
    handleResize();
    window.addEventListener("resize", handleResize);    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    if (windowWidth > 0) {
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
