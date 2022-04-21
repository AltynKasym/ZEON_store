import logo from "./logo.svg";
import "./App.scss";
import {
  AboutUs,
  Collection,
  Footer,
  Header,
  Help,
  Main,
  News,
  LoadPhoto,
} from "./components/Components";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/zeon_store" element={<Main />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/help" element={<Help />} />
        <Route path="/news" element={<News />} />
        <Route path="/collections" element={<Collection />} />
        <Route path="/load" element={<LoadPhoto />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
