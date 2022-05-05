import React, { useState, useEffect, useContext } from "react";
import CollectionItem from "../collection/CollectionItem";
import { Collection } from "../Components";
import Context from "../context";
import { getDatabase, child, get, ref } from "firebase/database";
import { app } from "../Database";
import "./basketProduct.scss";
import Carousel from "nuka-carousel";
import { Link } from "react-router-dom";

function BasketProduct({ data, id, collectionId }) {
  //   if (localStorage.getItem("favorites") === null) {
  //     localStorage.setItem("favorites", JSON.stringify([]));
  //   }
  //   const [addFavorites, setAddFavorites] = useState(false);
  //   let favorites = JSON.parse(localStorage.getItem("favorites"));
  //   function checkFavorite() {
  //     if (favorites.includes(`${collectionId}, ${data[id].productId}`)) {
  //       setAddFavorites(false);
  //     } else {
  //       setAddFavorites(true);
  //     }
  //   }
  //   function addToFavorites() {
  //     if (favorites.length === 0)
  //       favorites.push(`${collectionId}, ${data[id].productId}`);
  //     else {
  //       if (favorites.includes(`${collectionId}, ${data[id].productId}`)) {
  //         favorites.splice(
  //           favorites.indexOf(`${collectionId}, ${data[id].productId}`, 1)
  //         );
  //         setAddFavorites(true);
  //       } else {
  //         favorites.push(`${collectionId}, ${data[id].productId}`);
  //         setAddFavorites(false);
  //       }
  //     }
  //     localStorage.setItem("favorites", JSON.stringify(favorites));
  //   }
  //   return (
  //     <div className="productComponent__card">
  //       <div className="productComponent__card-img">
  //         <Link to={`/collection/product/${collectionId}/${data[id].productId}`}>
  // {typeof data[id].productImg !== "string" ? (
  //   <Carousel
  //     wrapAround={true}
  //     slidesToShow={1}
  //     defaultControlsConfig={{
  //       nextButtonStyle: {
  //         display: "none",
  //       },
  //       prevButtonStyle: {
  //         display: "none",
  //       },
  //     }}
  //   >
  //     {data[id].productImg.map((img) => {
  //       console.log(data[id].productId, "porductId");
  //       return (
  //         <img
  //           className="productComponent__card-photo"
  //           src={img}
  //           alt={img}
  //           key={img}
  //         />
  //       );
  //     })}
  //   </Carousel>
  // ) : (
  //   <img
  //     className="productComponent__card-photo"
  //     src={data[id].productImg}
  //     alt={data[id].productImg}
  //   />
  // )}
  //         </Link>
  //         <p
  //           className={
  //             addFavorites
  //               ? "productComponent__card-favoriteRemove"
  //               : "productComponent__card-favoriteAdd"
  //           }
  //           onClick={addToFavorites}
  //           onLoad={checkFavorite}
  //         ></p>
  //         <h2 className="productComponent__card-name">{data[id].productName}</h2>
  //   {data[id].productOldPrice > 0 ? (
  //     <>
  //       <div className="productComponent__card-percent">
  //         <span>
  //           {Math.round(
  //             100 -
  //               (Number(data[id].productPrice) * 100) /
  //                 Number(data[id].productOldPrice)
  //           )}
  //           %
  //         </span>
  //       </div>
  //       <span className="productComponent__card-oldPrice">{`${Math.trunc(
  //         data[id].productOldPrice
  //       )} р`}</span>
  //     </>
  //   ) : (
  //     <span></span>
  //   )}
  //         <p className="productComponent__card-price">
  //           {`${Math.trunc(data[id].productPrice)} р`}
  //         </p>
  //       </div>
  //       <p className="productComponent__card-size">
  //         {`Размер: ${data[id].productSize}`}
  //       </p>
  //       <p className="productComponent__card-colors">
  //         {data[id].productColors.map((color) => {
  //           return (
  //             <span key={color} style={{ backgroundColor: `${color}` }}></span>
  //           );
  //         })}
  //       </p>
  //     </div>
  //   );

  return (
    <div className="basketProduct">
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
        <div className="basketProduct__info-title">{data[id].productName}</div>
        <div className="basketProduct__info-size">
          Размер: <span>{data[id].productSize}</span>
        </div>
        <div className="basketProduct__info-color">
          Цвет: <span>{data[id].productColor}</span>
        </div>
        <div className="basketProduct__info-price">
          ${Math.trunc(data[id].productPrice)}
          {data[id].productOldPrice > 0 ? (
            <>
              <span>{`${Math.trunc(data[id].productOldPrice)} р`}</span>
            </>
          ) : (
            <span></span>
          )}
        </div>
        <div className="basketProduct__info-amount">- 1 +</div>
      </div>
    </div>
  );
}

export default BasketProduct;
