import React, { useState, useEffect, useContext } from "react";
import {
  Collection,
  NewProduct,
  ProductComponent,
  BasketProduct,
  Checkout,
} from "../Components";
import { Context } from "../context";
import { getDatabase, child, get, ref } from "firebase/database";
import { app } from "../Database";
import "./basket.scss";
import Carousel from "nuka-carousel";
import { Link } from "react-router-dom";
import { containerClasses, Pagination, Typography } from "@mui/material";

function Basket({ data }) {
  let basket = JSON.parse(localStorage.getItem("basket"));

  // const database = getDatabase(app);
  // const [data, setData] = useState({});
  // useEffect(() => {
  //   get(child(ref(database), `collection/`))
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
  // }, [basket]);

  let [step, setStep] = useState(4);
  const [products, setProducts] = useContext(Context);

  const [openChat, setOpenChat] = useState(false);

  return (
    <div className="basket">
      <div className="container">
        <div className="basket__inner">
          <div className="basket__products">
            {Object.keys(data).map((id, ind) => {
              return basket.map((item, indexx) => {
                if (id == item.split(",")[0] - 1) {
                  return data[id].collectionProducts.map((itemm, index) => {
                    if (itemm.productId == item.split(",")[1]) {
                      return (
                        <>
                          <BasketProduct
                            className="basket__products-item"
                            data={data[id].collectionProducts}
                            id={index}
                            collectionId={data[id].collectionId}
                            color={item.split(",")[2].trim()}
                            key={itemm + index}
                          />
                        </>
                      );
                    }
                  });
                }
              });
            })}
          </div>
          <div className="basket__orderDetail">
            <h2 className="basket__orderDetail-title">Сумма заказа</h2>
            <p className="basket__orderDetail-info">
              Количество линеек: <span>{products}</span>
            </p>
            <p className="basket__orderDetail-info">Количество товаров:</p>
            <p className="basket__orderDetail-info">Стоимость:</p>
            <p className="basket__orderDetail-info">Скидка:</p>
            <p className="basket__orderDetail-info">Итого к оплате:</p>
            <button
              className="basket__orderButton"
              onClick={() => setOpenChat(!openChat)}
            >
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
      <div style={openChat ? { display: "block" } : { display: "none" }}>
        <Checkout />
      </div>
    </div>
  );
}

export default Basket;
