import React, { useState, useEffect, useContext } from "react";
import CollectionItem from "../collection/CollectionItem";
import {
  Collection,
  NewProduct,
  ProductComponent,
  BasketProduct,
} from "../Components";
import Context from "../context";
import { getDatabase, child, get, ref } from "firebase/database";
import { app } from "../Database";
import "./basket.scss";
import Carousel from "nuka-carousel";
import { Link } from "react-router-dom";
import { containerClasses, Pagination, Typography } from "@mui/material";

function Basket() {
  const database = getDatabase(app);
  const [data, setData] = useState({});

  let basket = JSON.parse(localStorage.getItem("basket"));

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

  let [step, setStep] = useState(4);

  return (
    <div className="basket">
      <div className="container">
        <h3 className="basket__title">Корзина</h3>
        <p className="basket__amount">
          Товаров в корзине: <span>{basket.length}</span>
        </p>
        <div className="basket__inner">
          <div className="basket__products">
            {Object.keys(data).map((id, ind) => {
              return basket.map((item, indexx) => {
                if (id == item.split(",")[0] - 1) {
                  return data[id].collectionProducts.map((itemm, index) => {
                    if (itemm.productId == item.split(",")[1]) {
                      return (
                        <>
                          {/* <ProductComponent
                            data={data[id].collectionProducts}
                            id={index}
                            collectionId={data[id].collectionId}
                            key={item + index}
                          /> */}

                          <BasketProduct
                            data={data[id].collectionProducts}
                            id={index}
                            collectionId={data[id].collectionId}
                            key={item + index}
                          />
                        </>
                      );
                    }
                  });
                }
              });
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Basket;
