import "./App.scss";
import Header from "./layouts/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import SideNav from "./components/navBars/SideNav";
import { Blog } from "./pages/Blog";
import { useEffect, useMemo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import Footer from "./layouts/Footer";
import MobileNav from "./components/navBars/MobileNav";
import Gallery from "./pages/Gallery";
import AnimContext from "./context/AnimContext";
import PostPage from "./components/Blog/PostPage";
import ContactUs from "./pages/ContactUs";
import HowBuy from "./pages/HowBuy";
import SuccessfulPayment from "./components/HowBuy/SuccessfulPayment";
import InactiveScreen from "./utils/InactiveScreen";
import PaymentCanceled from "./components/HowBuy/PaymentCanceled";
import {
  useInactiveScreenStore,
  useWindowSize,
} from "./hooks/useStore";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App(): JSX.Element {
  const [smootherOk, setSmootherOk] = useState<boolean>(false);
  const [footerTimeline, setFooterTimeline] =
    useState<gsap.core.Timeline | null>(null);
  //store
  //inactive screen
  const inactiveScreen = useInactiveScreenStore((state) => state.active);
  //window size
  const setWindowWidth = useWindowSize((set) => set.setWidth);
  const mobile = useWindowSize((set) =>  set.mobile );
  
  ScrollTrigger.normalizeScroll(true);

  useEffect(() => {
    let smoother: globalThis.ScrollSmoother | null = null
    let width = 0;
    //window size event listener
    const handleResize = (): void => {
     width = window.innerWidth;
      setWindowWidth(width);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    //set up smooth scroller
    if (600 <= width) {
      console.log("inside");
      smoother= ScrollSmoother.create({
        smooth: 2, // seconds it takes to "catch up" to native scroll position
        effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        speed: 0.5,
      });        
    }
    setSmootherOk(true);  
    
    const preventDefault = (e:any) => e.preventDefault();
    // When rendering our container
    window.addEventListener("touchmove", preventDefault, {
      passive: false,
    });
   

    return () => {
      if (smoother) {
        smoother.kill()
      }
       // Remember to clean up when removing it
    window.removeEventListener("touchmove", preventDefault);
      window.removeEventListener("resize", handleResize)};
  }, [mobile]);

  return (
    <div className="App" id="App">
      <AnimContext.Provider
        value={{ smootherOk, footerTimeline, setFooterTimeline }}
      >
        <SideNav />
        <MobileNav />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <div className="pagesContainer">
              <Header />
              <Routes>
                <Route path="/" element={<AboutUs />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:blogId" element={<PostPage />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/how-buy" element={<HowBuy />} />
                <Route
                  path="/how-buy/successful-payment/:session_id"
                  element={<SuccessfulPayment />}
                />
                <Route
                  path="how-buy/payment-canceled"
                  element={<PaymentCanceled />}
                />
              </Routes>
              <Footer />
            </div>
          </div>
        </div>
        {inactiveScreen ? <InactiveScreen /> : ""}
        </AnimContext.Provider>
    </div>
  );
}

export default App;
