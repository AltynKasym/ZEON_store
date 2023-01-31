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
    Checkout,
    RelatedProducts,
    Bestseller,
} from "./components/Components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Context } from "./components/context";
import { getDatabase, child, get, ref } from "firebase/database";
import { app } from "./components/Database";
import { db } from "./components/db";

function App() {
    const [products, setProducts] = useState("0");
    const [productsAmount, setProductsAmount] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [data, setData] = useState({});
    const [data2, setData2] = useState({});
    let basket = JSON.parse(localStorage.getItem("basket"));
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    const [searchProduct, setSearchProduct] = useState("");

    useEffect(() => {
        setData(db.collection);
    }, [basket, favorites]);

    console.log("data", data);

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
                    searchProduct,
                    setSearchProduct,
                ]}
            >
                <Header data={data} />
                <Routes>
                    <Route
                        path="/zeon_store"
                        element={<MainPage data={data} />}
                    />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/news" element={<News />} />
                    <Route
                        path="/collections"
                        element={<Collection data={data} />}
                    />

                    <Route
                        path="/collections/*"
                        element={<CollectionPage data={data} />}
                    />
                    <Route
                        path="/zeon_store/collections/*"
                        element={<CollectionPage data={data} />}
                    />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/basket" element={<Basket />} />
                    <Route
                        path="/collection/product/*"
                        element={<ProductPage data={data} />}
                    />
                    <Route path="/new" element={<NewProduct />} />
                    <Route path="/bestseller" element={<Bestseller />} />
                    <Route path="/related" element={<RelatedProducts />} />
                    <Route
                        path="/search/*"
                        element={<SearchPage data={data} />}
                    />
                    <Route path="/modal" element={<ModalWindow />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/offer" element={<Offer />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </Context.Provider>
        </div>
    );
}

export default App;
