import React, { useState, useEffect, useContext } from "react";
import { Collection } from "../Components";
import { Context } from "../context";
import { getDatabase, child, get, ref } from "firebase/database";
import { app } from "../Database";
import "./basketProduct.scss";
import Carousel from "nuka-carousel";
import { Link } from "react-router-dom";

function BasketProduct({ data, id, collectionId, color, productAmount }) {
    const [amount, setAmount] = useState(Number(productAmount));
    const [products, setProducts] = useContext(Context);
    const [productsAmount, setProductsAmount] = useContext(Context);

    function deleteFromBasket() {
        let basket = JSON.parse(localStorage.getItem("basket"));
        basket.map((item, ind) => {
            if (item.includes(`${collectionId}, ${id + 1}, ${color}`)) {
                basket.splice(ind, 1);
                localStorage.setItem("basket", JSON.stringify(basket));
            }
        });
    }

    function setAmountProducts() {
        let basket = JSON.parse(localStorage.getItem("basket"));

        basket.map((item, ind) => {
            if (item.includes(`${collectionId}, ${id + 1}, ${color}`)) {
                let bas2 = item.split(",");
                bas2.splice(3, 1, amount);
                basket.splice(ind, 1, bas2.join());
            }
        });
        localStorage.setItem("basket", JSON.stringify(basket));
    }

    function decrementAmount() {
        if (amount > 1) {
            setAmount(amount - 1);
        }
        setAmountProducts();
    }

    function incrementAmount() {
        setAmount(amount + 1);
        setAmountProducts();
    }
    return (
        <div className="basketProduct">
            <div className="basketProduct__card">
                <div className="basketProduct__media">
                    {typeof data[id].productImg !== "string" ? (
                        <img
                            className="basketProduct__media-photoo"
                            src={data[id].productImg[0]}
                            alt={data[id].productName}
                            key={data[id].productId}
                        />
                    ) : (
                        <img
                            className="basketProduct__media-photo"
                            src={data[id].productImg}
                            alt={data[id].productName}
                        />
                    )}
                </div>
                <div className="basketProduct__info">
                    <div className="basketProduct__info-title">
                        {data[id].productName}
                    </div>
                    <div className="basketProduct__info-size">
                        Размер: <span>{data[id].productSize}</span>
                    </div>
                    <div className="basketProduct__info-color">
                        Цвет:{" "}
                        <span style={{ backgroundColor: `${color}` }}></span>
                    </div>
                    <div className="basketProduct__info-price">
                        {Math.trunc(data[id].productPrice)}р
                        {data[id].productOldPrice > 0 ? (
                            <>
                                <span>{`${Math.trunc(
                                    data[id].productOldPrice
                                )} р`}</span>
                            </>
                        ) : (
                            <span></span>
                        )}
                    </div>
                    <div className="basketProduct__amount">
                        <button
                            className="basketProduct__button basketProduct__amount-decrement"
                            onClick={decrementAmount}
                        >
                            -
                        </button>
                        <span className="basketProduct__amount-product">
                            {amount}
                        </span>
                        <button
                            className="basketProduct__button basketProduct__amount-increment"
                            onClick={incrementAmount}
                        >
                            +
                        </button>
                    </div>
                </div>
                <span
                    className="basketProduct__closeButton"
                    onClick={deleteFromBasket}
                ></span>
            </div>
        </div>
    );
}

export default BasketProduct;
