import logo from "./logo.svg";
import "./App.scss";
import {
  AboutUs,
  Collection,
  CollectionPage,
  Footer,
  Header,
  Help,
  Main,
  News,
  NotFound,
  Offer,
} from "./components/Components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
        <Route path="/collections/*" element={<CollectionPage />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
