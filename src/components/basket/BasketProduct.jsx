import React, { useState, useEffect, useContext } from "react";
import { Collection } from "../Components";
import { Context } from "../context";
import { getDatabase, child, get, ref } from "firebase/database";
import { app } from "../Database";
import "./basketProduct.scss";
import Carousel from "nuka-carousel";
import { Link } from "react-router-dom";
// import { context } from "../context";

function BasketProduct({ data, id, collectionId, color }) {
  // window.addEventListener("load", function () {
  //   if (basket.includes(`${collectionId}, ${id}, ${color}`)) {
  //     // setAddFavorites(true);
  //   } else {
  //     // setAddFavorites(false);
  //   }
  // });
  // const [color, setColor] = useState("");

  const [amount, setAmount] = useState(1);
  const [products, setProducts] = useContext(Context);
  const [productsAmount, setProductsAmount] = useContext(Context);

  function deleteFromBasket() {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (basket.includes(`${collectionId}, ${id + 1}, ${color}`)) {
      basket.splice(basket.indexOf(`${collectionId}, ${id + 1}, ${color}`), 1);

      localStorage.setItem("basket", JSON.stringify(basket));
    } else alert("No includes");
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
            Цвет: <span style={{ backgroundColor: `${color}` }}></span>
          </div>
          <div className="basketProduct__info-price">
            {Math.trunc(data[id].productPrice)}р
            {data[id].productOldPrice > 0 ? (
              <>
                <span>{`${Math.trunc(data[id].productOldPrice)} р`}</span>
              </>
            ) : (
              <span></span>
            )}
          </div>
          <div className="basketProduct__amount">
            <button
              className="basketProduct__button basketProduct__amount-decrement"
              onClick={() => {
                if (amount > 1) {
                  setAmount(amount - 1);
                  setProducts(amount - 1);
                }
              }}
            >
              -
            </button>
            <span className="basketProduct__amount-product">{amount}</span>
            <button
              className="basketProduct__button basketProduct__amount-increment"
              onClick={() => {
                setAmount(amount + 1);
                setProducts(amount + 1);
              }}
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
