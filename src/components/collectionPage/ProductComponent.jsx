import React, { useState, useEffect, useContext } from "react";
import { Collection } from "../Components";
import Context from "../context";
import { getDatabase, child, get, ref } from "firebase/database";
import { app } from "../Database";
import "./productComponent.scss";
import Carousel from "nuka-carousel";
import { Link } from "react-router-dom";
import { containerClasses, Pagination, Typography } from "@mui/material";

function ProductComponent({ data, id, collectionId }) {
  if (localStorage.getItem("favorites") === null) {
    localStorage.setItem("favorites", JSON.stringify([]));
  }

  const [addFavorites, setAddFavorites] = useState(false);

  useEffect(() => {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites.includes(`${collectionId}, ${data[id].productId}`)) {
      setAddFavorites(true);
    } else {
      setAddFavorites(false);
    }
  }, []);

  function addToFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites.length === 0)
      favorites.push(`${collectionId}, ${data[id].productId}`);
    else {
      if (favorites.includes(`${collectionId}, ${data[id].productId}`)) {
        favorites.splice(
          favorites.indexOf(`${collectionId}, ${data[id].productId}`),
          1
        );
        setAddFavorites(false);
      } else {
        favorites.push(`${collectionId}, ${data[id].productId}`);
        setAddFavorites(true);
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  const [isShown, setIsShown] = useState(false);

  return (
    <div className="productComponent__card">
      <div className="productComponent__card-img">
        <Link
          to={`/collection/product/${collectionId}/${data[id].productId}`}
          onClick={() => window.scrollTo(0, 0)}
        >
          {typeof data[id].productImg !== "string" ? (
            <Carousel
              autoplay={true}
              dragging={true}
              wrapAround={true}
              slidesToShow={1}
              defaultControlsConfig={{
                pagingDotsContainerClassName: "pagingDotContainer",
                nextButtonStyle: {
                  display: "none",
                },
                prevButtonStyle: {
                  display: "none",
                },
              }}
            >
              {data[id].productImg.map((img) => {
                return (
                  <img
                    className="productComponent__card-photo"
                    src={img}
                    alt={img}
                    key={img}
                    onMouseEnter={() => setIsShown(true)}
                    onMouseLeave={() => setIsShown(false)}
                  />
                );
              })}
            </Carousel>
          ) : (
            <img
              className="productComponent__card-photo"
              src={data[id].productImg}
              alt={data[id].productImg}
              onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}
            />
          )}
        </Link>
        {isShown && (
          <div className="productComponent__card-showAllPhotos">
            {typeof data[id].productImg !== "string" ? (
              data[id].productImg.map((img) => {
                return (
                  <img
                    className="productComponent__card-photo"
                    src={img}
                    alt={img}
                    key={img}
                  />
                );
              })
            ) : (
              <img
                className="productComponent__card-photo"
                src={data[id].productImg}
                alt={data[id].productImg}
              />
            )}
          </div>
        )}
        <p
          className={
            addFavorites
              ? "productComponent__card-favoriteAdd"
              : "productComponent__card-favoriteRemove"
          }
          onClick={addToFavorites}
        ></p>
        <h2 className="productComponent__card-name">{data[id].productName}</h2>
        {data[id].productOldPrice > 0 ? (
          <>
            <div className="productComponent__card-percent">
              <span>
                {Math.round(
                  100 -
                    (Number(data[id].productPrice) * 100) /
                      Number(data[id].productOldPrice)
                )}
                %
              </span>
            </div>
            <span className="productComponent__card-oldPrice">{`${Math.trunc(
              data[id].productOldPrice
            )} р`}</span>
          </>
        ) : (
          <span></span>
        )}
        <p className="productComponent__card-price">
          {`${Math.trunc(data[id].productPrice)} р`}
        </p>
      </div>
      <p className="productComponent__card-size">
        {`Размер: ${data[id].productSize}`}
      </p>
      <p className="productComponent__card-colors">
        {data[id].productColors.map((color) => {
          return (
            <span key={color} style={{ backgroundColor: `${color}` }}></span>
          );
        })}
      </p>
    </div>
  );
}

export default ProductComponent;
