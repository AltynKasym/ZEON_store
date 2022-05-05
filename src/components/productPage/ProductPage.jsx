import React, { useState, useEffect, useContext } from "react";
import CollectionItem from "../collection/CollectionItem";
import { Collection, NewProduct, ProductComponent } from "../Components";
import Context from "../context";
import { getDatabase, child, get, ref } from "firebase/database";
import { app } from "../Database";
import "./productPage.scss";
import Carousel from "nuka-carousel";
import { Link } from "react-router-dom";
import { containerClasses, Pagination, Typography } from "@mui/material";

function ProductPage() {
  const collectionId = Number(window.location.href.split("/")[5]);
  const productId = Number(window.location.href.split("/")[6]);

  const database = getDatabase(app);
  const [data, setData] = useState({});

  useEffect(() => {
    get(
      child(ref(database), `collection/${collectionId - 1}/collectionProducts`)
    )
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
  }, [data]);

  if (localStorage.getItem("favorites") === null) {
    localStorage.setItem("favorites", JSON.stringify([]));
  }

  const [addFavorites, setAddFavorites] = useState(false);
  let favorites = JSON.parse(localStorage.getItem("favorites"));
  window.addEventListener("load", function () {
    if (favorites.includes(`${collectionId}, ${productId}`)) {
      setAddFavorites(true);
    } else {
      setAddFavorites(false);
    }
  });

  function addToFavorites() {
    if (favorites.length === 0) favorites.push(`${collectionId}, ${productId}`);
    else {
      if (favorites.includes(`${collectionId}, ${productId}`)) {
        favorites.splice(favorites.indexOf(`${collectionId}, ${productId}`, 1));
        setAddFavorites(false);
      } else {
        favorites.push(`${collectionId}, ${productId}`);
        console.log("added");
        setAddFavorites(true);
      }
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  if (localStorage.getItem("basket") === null) {
    localStorage.setItem("basket", JSON.stringify([]));
  }

  // const [addFavorites, setAddFavorites] = useState(false);
  let basket = JSON.parse(localStorage.getItem("basket"));
  window.addEventListener("load", function () {
    if (basket.includes(`${collectionId}, ${productId}`)) {
      // setAddFavorites(true);
    } else {
      // setAddFavorites(false);
    }
  });
  const [color, setColor] = useState("");

  // console.log(color, "color");
  function addToBasket() {
    if (color !== "") {
      if (basket.length === 0) {
        basket.push(`${collectionId}, ${productId}, ${color}`);
        setColor("");
      } else {
        if (basket.includes(`${collectionId}, ${productId}`)) {
          basket.splice(
            basket.indexOf(`${collectionId}, ${productId}, ${color}`, 1)
          );
          // setAddFavorites(false);
        } else {
          basket.push(`${collectionId}, ${productId}, ${color}`);
          setColor("");

          // setAddFavorites(true);
        }
      }

      localStorage.setItem("basket", JSON.stringify(basket));
    } else alert("Вы не выбарали цвет");
  }

  return (
    <div className="productPage">
      <div className="container">
        <h1 className="productPage__title"></h1>
        <div className="productPage__info">
          <div className="productPage__info-media">
            {Object.keys(data).map((id) => {
              if (id == productId - 1) {
                if (typeof data[id].productImg !== "string") {
                  return data[id].productImg.map((img) => {
                    return (
                      <img
                        className="productPage__info-photo"
                        src={img}
                        alt={img}
                      />
                    );
                  });
                } else
                  return (
                    <img
                      className="productPage__info-photo"
                      src={data[id].productImg}
                      alt={data[id].productImg}
                    />
                  );
              }
            })}
          </div>
          <div className="productPage__info-text">
            {Object.keys(data).map((id) => {
              if (id == productId - 1) {
                return (
                  <>
                    <h1 className="productPage__info-name">
                      {data[id].productName}
                    </h1>
                    <p className="productPage__info-artcode">
                      Артикул:
                      <span>{data[id].productArtcode}</span>
                    </p>
                    <div className="productPage__info-color">
                      <p>Цвет:</p>
                      {data[id].productColors.map((color) => {
                        return (
                          <div className="productPage__info-color">
                            <span
                              style={{
                                backgroundColor: `${color}`,
                              }}
                            >
                              <input
                                data-color={color}
                                type="radio"
                                name="color"
                                id={color}
                                style={{
                                  accentColor: `${color}`,
                                  outline: "none",
                                }}
                                onChange={(e) =>
                                  setColor(e.target.dataset.color)
                                }
                              />
                            </span>

                            {/* <span
                              data-color={color}
                              key={color}
                              style={{ backgroundColor: `${color}` }}
                              onClick={(e) =>
                                console.log(e.target.dataset.color)
                              }
                            ></span> */}
                          </div>
                        );
                      })}
                    </div>

                    <p className="productPage__info-newPrice">
                      {data[id].productPrice} р
                    </p>
                    <span className="productPage__info-oldPrice">
                      {data[id].productOldPrice > 0 ? (
                        <>
                          <span>{`${Math.trunc(
                            data[id].productOldPrice
                          )} р`}</span>
                        </>
                      ) : (
                        <span></span>
                      )}
                    </span>
                    <h4 className="productPage__info-aboutTitle">О товаре:</h4>
                    <p className="productPage__info-aboutText">
                      {data[id].productInfo}
                    </p>
                    <div className="productPage__infoblock">
                      <p className="productPage__infoblock-item">
                        Размерный ряд:
                        <span>{data[id].productSize}</span>
                      </p>

                      <p className="productPage__infoblock-item">
                        Состав ткани:
                        <span> {data[id].productCompound}</span>
                      </p>
                      <p className="productPage__infoblock-item">
                        Количество в линейке:
                        <span> {data[id].productAmount}</span>
                      </p>
                      <p className="productPage__infoblock-item">
                        Материал:
                        <span> {data[id].productMaterial}</span>
                      </p>
                    </div>
                    <div className="productPage__button" onClick={addToBasket}>
                      <button className="productPage__button-sale productPage__button-basket ">
                        {" "}
                        Добавить в корзину
                      </button>
                      <button
                        className={
                          addFavorites
                            ? "productPage__button-sale productPage__button-favoritesRemove"
                            : "productPage__button-sale productPage__button-favoritesAdd"
                        }
                        onClick={addToFavorites}
                      ></button>
                    </div>
                  </>
                );
              }
            })}
          </div>
        </div>

        <div className="productPage__newProduct">
          <h2 className="productPage__newProduct-title">Похожие товары</h2>
          <NewProduct collectionId={collectionId} />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
