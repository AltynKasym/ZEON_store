import React, { useState, useEffect, useContext } from "react";
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
  NewProduct,
  ProductPage,
  Favorites,
  Basket,
  MainPage,
  SearchPage,
  ModalWindow,
} from "./components/Components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Context } from "./components/context";
import { getDatabase, child, get, ref } from "firebase/database";
import { app } from "./components/Database";

function App() {
  const [products, setProducts] = useState("0");
  const [productsAmount, setProductsAmount] = useState([]);
  const [searchText, setSearchText] = useState("");
  const database = getDatabase(app);
  const [data, setData] = useState({});
  let basket = JSON.parse(localStorage.getItem("basket"));
  let favorites = JSON.parse(localStorage.getItem("favorites"));

  useEffect(() => {
    get(child(ref(database), `collection/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData({ ...snapshot.val() });
        } else {
          setData({});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      <Context.Provider
        value={[
          products,
          setProducts,
          productsAmount,
          setProductsAmount,
          searchText,
          setSearchText,
          data,
        ]}
      >
        <Header />
        <Routes>
          <Route path="/zeon_store" element={<MainPage data={data} />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/help" element={<Help />} />
          <Route path="/news" element={<News />} />
          <Route path="/collections" element={<Collection data={data} />} />
          <Route
            path="/collections/*"
            element={<CollectionPage data={data} />}
          />
          <Route path="/favorites" element={<Favorites data={data} />} />
          <Route path="/basket" element={<Basket data={data} />} />
          <Route
            path="/collection/product/*"
            element={<ProductPage data={data} />}
          />
          <Route path="/new" element={<NewProduct />} />
          <Route path="/search" element={<SearchPage data={data} />} />
          <Route path="/modal" element={<ModalWindow />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Context.Provider>
    </div>
  );
}

export default App;
