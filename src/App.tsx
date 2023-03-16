import "./App.scss";
import Header from "./layouts/Header";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import SideNav from "./components/navBars/SideNav";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import Footer from "./layouts/Footer";
import MobileNav from "./components/navBars/MobileNav";
import Gallery from "./pages/Gallery";
import AnimContext from "./context/AnimContext";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// function safeSmoother(vars: any) {
//   let wrapper = gsap.utils.toArray(vars.wrapper || document.body)[0],
//     existingScrollTriggers = ScrollTrigger.getAll().filter(
//       (st) => st.scroller === window || st.scroller === wrapper
//     );
//   //@ts-ignore
//   existingScrollTriggers.forEach((st) => st.revert(true, true));
//   let smoother = ScrollSmoother.create(vars);
//   existingScrollTriggers.forEach((st) => {
//     st.vars.scroller = smoother.wrapper();
//     //@ts-ignore
//     st.revert(false, true);
//     //@ts-ignore
//     st.init(st.vars, st.animation);
//   });
//   return smoother;
// }

function App(): JSX.Element {
  const [smootherOk, setSmootherOk] = useState<boolean>(false);
  const [footerTimeline, setFooterTimeline] = useState<gsap.core.Timeline | null>(null)
  useEffect(() => {
    // let smoother: globalThis.ScrollSmoother = safeSmoother({
    //   smooth: 2, // seconds it takes to "catch up" to native scroll position
    //   effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
    //   wrapper: "#smooth-wrapper",
    //   content: "#smooth-content",
    //   speed: 0.5
    // });
    // console.log("create ScrollSmoother");
    // return () => smoother.kill();

    let smoother: globalThis.ScrollSmoother = ScrollSmoother.create({
      smooth: 2, // seconds it takes to "catch up" to native scroll position
      effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      speed: 0.5,
    });
    setSmootherOk(true);
    return () => smoother.kill();
  }, []);

  return (
    <div className="App" id="App">
      <AnimContext.Provider value={{smootherOk, footerTimeline, setFooterTimeline}}>
        <SideNav />
        <MobileNav />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <Header />
            <Routes>
              <Route path="/" element={<AboutUs />} />
              <Route path="/gallery" element={<Gallery />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </AnimContext.Provider>
    </div>
  );
}

export default App;
