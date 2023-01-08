import "./App.scss";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./components/AboutUs/AboutUs"

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>        
        <Route path="/" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
