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

function Basket() {
  let basket = JSON.parse(localStorage.getItem("basket"));
  let productAmount = [],
    allProducts;

  basket.map((item, indexx) => {
    productAmount.push(Number(item.split(",")[3]));
    allProducts = productAmount.reduce((a, b) => a + b);
  });

  const database = getDatabase(app);
  const [data, setData] = useState({});
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
  const [products, setProducts] = useContext(Context);

  const [openChat, setOpenChat] = useState(false);

  function calculateProducts() {
    let basket = JSON.parse(localStorage.getItem("basket"));
    basket.map((item, indexx) => {
      productAmount.push(item.split(",")[4]);
      console.log(productAmount);
    });
  }

  let productPrice = [],
    productOldPrice = [];
  let discount = [];

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
                      productPrice.push(
                        itemm.productPrice * item.split(",")[3]
                      );
                      discount.push(
                        itemm.productOldPrice
                          ? (Number(itemm.productOldPrice) -
                              Number(itemm.productPrice)) *
                              item.split(",")[3]
                          : 0
                      );
                      productOldPrice.push(
                        itemm.productOldPrice
                          ? Number(itemm.productOldPrice) * item.split(",")[3]
                          : Number(itemm.productPrice) * item.split(",")[3]
                      );

                      return (
                        <>
                          <BasketProduct
                            className="basket__products-item"
                            data={data[id].collectionProducts}
                            id={index}
                            collectionId={data[id].collectionId}
                            color={item.split(",")[2].trim()}
                            key={itemm + index}
                            productAmount={item.split(",")[3]}
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
            {console.log(discount, "discount")}
            {console.log(productPrice, "productPrice")}
            {console.log(productOldPrice, "productOldPrice")}
            <h2 className="basket__orderDetail-title">Сумма заказа</h2>
            <p className="basket__orderDetail-info">
              Количество линеек: <span>{`${allProducts} шт`}</span>
            </p>
            <p className="basket__orderDetail-info">
              Количество товаров:<span>{`${allProducts * 5} шт`}</span>
            </p>
            <p className="basket__orderDetail-info">
              Стоимость:
              <span>{`${productOldPrice.reduce(
                (a, b) => a + b,
                0
              )} рублей`}</span>
            </p>
            <p className="basket__orderDetail-info">
              Скидка:
              <span>{`${discount.reduce((a, b) => a + b, 0)} рублей`}</span>
            </p>
            <p className="basket__orderDetail-info">
              Итого к оплате:{" "}
              <span>
                {`${
                  productOldPrice.reduce((a, b) => a + b, 0) -
                  discount.reduce((a, b) => a + b, 0)
                }  рублей`}
              </span>
            </p>
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
