import logo from "./logo.svg";
import "./App.scss";
import { AboutUs, Footer, Header } from "./components/Components";

function App() {
  return (
    <div className="App">
      <Header />
      <AboutUs />
      <Footer />
    </div>
  );
}

export default App;
