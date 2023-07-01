import "./App.scss";
import Header from "./layouts/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import SideNav from "./components/navBars/SideNav";
import { Blog } from "./pages/Blog";
import { useEffect, useState } from "react";
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

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App(): JSX.Element {
  const [smootherOk, setSmootherOk] = useState<boolean>(false);
  const [footerTimeline, setFooterTimeline] = useState<gsap.core.Timeline | null>(null)
  
  useEffect(() => {
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
      <AnimContext.Provider
        value={{ smootherOk, footerTimeline, setFooterTimeline }}
      >
        <SideNav />
        <MobileNav />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <Header />
            <Routes>
              <Route path="/" element={<AboutUs />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:blogId" element={<PostPage />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/how-buy" element={<HowBuy />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </AnimContext.Provider>
    </div>
  );
}

export default App;
