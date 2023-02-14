import "./App.scss";
import Header from "./layouts/Header";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import SideNav from "./components/navBars/SideNav";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import Footer from "./layouts/Footer";
import MobileNav from "./components/navBars/MobileNav";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App(): JSX.Element {
  useEffect(() => {
    let smoother: globalThis.ScrollSmoother = ScrollSmoother.create({
      smooth: 2, // seconds it takes to "catch up" to native scroll position
      effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      speed: 0.5,
    });
  }, []);

  return (
    <div className="App" id="App">
      <SideNav />
      <MobileNav />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Header />
          <Routes>
            <Route path="/" element={<AboutUs />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
