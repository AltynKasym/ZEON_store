import logo from "./logo.svg";
import "./App.scss";
import { AboutUs, Footer, Header, Help } from "./components/Components";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/help" element={<Help />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
