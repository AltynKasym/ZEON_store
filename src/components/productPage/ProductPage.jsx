import React, { useState, useEffect, useContext } from "react";
import { Collection, NewProduct, ProductComponent } from "../Components";
import Context from "../context";
import { getDatabase, child, get, ref } from "firebase/database";
import { app } from "../Database";
import "./productPage.scss";
import Carousel from "nuka-carousel";
import { Link } from "react-router-dom";
import { containerClasses, Pagination, Typography } from "@mui/material";

function ProductPage({ data }) {
  const collectionId = Number(window.location.href.split("/")[5]);
  const productId = Number(window.location.href.split("/")[6]);

  // const database = getDatabase(app);
  // const [data, setData] = useState({});

  // useEffect(() => {
  //   get(
  //     child(ref(database), `collection/${collectionId - 1}/collectionProducts`)
  //   )
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         setData({ ...snapshot.val() });
  //       } else {
  //         setData({});
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [data]);

  let favorites = JSON.parse(localStorage.getItem("favorites"));
  const [addFavorites, setAddFavorites] = useState(false);

  useEffect(() => {
    if (favorites.includes(`${collectionId}, ${productId}`)) {
      setAddFavorites(true);
    } else {
      setAddFavorites(false);
    }
  }, []);

  function addToFavorites() {
    if (favorites.length === 0) {
      favorites.push(`${collectionId}, ${productId}`);
      setAddFavorites(true);
    } else {
      if (favorites.includes(`${collectionId}, ${productId}`)) {
        favorites.splice(favorites.indexOf(`${collectionId}, ${productId}`), 1);
        setAddFavorites(false);
      } else {
        favorites.push(`${collectionId}, ${productId}`);
        console.log("added");
        setAddFavorites(true);
      }
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  const [color, setColor] = useState("");
  const [toBasket, setToBasket] = useState(false);

  function addToBasket() {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (color !== "") {
      if (basket.length === 0) {
        basket.push(`${collectionId}, ${productId}, ${color}`);
        setColor("");
        setToBasket(true);
      } else {
        if (basket.includes(`${collectionId}, ${productId}, ${color}`)) {
          basket.splice(
            basket.indexOf(`${collectionId}, ${productId}, ${color}`),
            1
          );
        } else {
          basket.push(`${collectionId}, ${productId}, ${color}`);
          setColor("");
          setToBasket(true);
        }
      }

      localStorage.setItem("basket", JSON.stringify(basket));
    } else alert("Выберите цвет");
  }

  return (
    <div className="productPage">
      <div className="container">
        <h1 className="productPage__title"></h1>
        <div className="productPage__info">
          <div className="productPage__info-media">
            {Object.keys(data).map((id, ind) => {
              if (id == collectionId - 1) {
                return data[id].collectionProducts.map((item, index) => {
                  console.log(item, "item");
                  if (index == productId - 1) {
                    if (typeof item.productImg !== "string") {
                      return item.productImg.map((img) => {
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
                          src={item.productImg}
                          alt={item.productImg}
                        />
                      );
                  }
                });
              }
            })}

            {/* {Object.keys(data).map((id) => {
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
            })} */}
          </div>
          <div className="productPage__info-text">
            {Object.keys(data).map((id, ind) => {
              if (id == collectionId - 1) {
                return data[id].collectionProducts.map((item, index) => {
                  console.log(item, "item");
                  if (index == productId - 1) {
                    return (
                      <>
                        <h1 className="productPage__info-name">
                          {item.productName}
                        </h1>
                        <p className="productPage__info-artcode">
                          Артикул:
                          <span>{item.productArtcode}</span>
                        </p>
                        <div className="productPage__info-color">
                          <p>Цвет:</p>
                          {item.productColors.map((color) => {
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
                              </div>
                            );
                          })}
                        </div>

                        <p className="productPage__info-newPrice">
                          {item.productPrice} р
                        </p>
                        <span className="productPage__info-oldPrice">
                          {item.productOldPrice > 0 ? (
                            <>
                              <span>{`${Math.trunc(
                                item.productOldPrice
                              )} р`}</span>
                            </>
                          ) : (
                            <span></span>
                          )}
                        </span>
                        <h4 className="productPage__info-aboutTitle">
                          О товаре:
                        </h4>
                        <p className="productPage__info-aboutText">
                          {item.productInfo}
                        </p>
                        <div className="productPage__infoblock">
                          <p className="productPage__infoblock-item">
                            Размерный ряд:
                            <span>{item.productSize}</span>
                          </p>

                          <p className="productPage__infoblock-item">
                            Состав ткани:
                            <span> {item.productCompound}</span>
                          </p>
                          <p className="productPage__infoblock-item">
                            Количество в линейке:
                            <span> {item.productAmount}</span>
                          </p>
                          <p className="productPage__infoblock-item">
                            Материал:
                            <span> {item.productMaterial}</span>
                          </p>
                        </div>
                        <div className="productPage__button">
                          <button
                            className="productPage__button-sale productPage__button-basket "
                            onClick={addToBasket}
                          >
                            Добавить в корзину
                          </button>

                          {toBasket && (
                            <Link to="/basket">
                              <button className="productPage__button-toBasket ">
                                Перейти в корзину
                              </button>
                            </Link>
                          )}

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
                });
              }
            })}

            {/*   {Object.keys(data).map((id) => {
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
                            ></span>
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
                    <div className="productPage__button">
                      <button
                        className="productPage__button-sale productPage__button-basket "
                        onClick={addToBasket}
                      >
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
            })}*/}
          </div>
        </div>

        <div className="productPage__newProduct">
          <h2 className="productPage__newProduct-title">Похожие товары</h2>
          <NewProduct collectionId={collectionId} data={data} />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
