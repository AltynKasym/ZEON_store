import React, { useState, useEffect, useContext } from "react";
import {
  Collection,
  NewProduct,
  ProductComponent,
  RandomProducts,
} from "../Components";
import { Context } from "../context";
import { getDatabase, child, get, ref } from "firebase/database";
import { app } from "../Database";
import "./searchPage.scss";
import Carousel from "nuka-carousel";
import { Link } from "react-router-dom";
import { containerClasses, Pagination, Typography } from "@mui/material";

function SearchPage({ data }) {
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
  // }, []);

  const [searchText, setSearchText, searchProduct, setSearchProduct] =
    useContext(Context);

  const perPage = 8;
  const [page, setPage] = useState(1);
  const [collectionBegin, setCollectionBegin] = useState(0);
  const [collectionEnd, setCollectionEnd] = useState(perPage - 1);

  const handleChange = function (event, value) {
    setPage(value);
    setCollectionBegin(value * perPage - perPage);
    setCollectionEnd(value * perPage - 1);
  };

  let products = new Set();
  let productsAmount = [];

  // const [searchProduct, setSearchProduct] = useState("");

  return (
    <div className="searchPage">
      <div className="container">
        {
          <h2 className="searchPage__card-amount">
            Результаты поиска по запросу:{" "}
            {typeof searchText !== "undefined" ? (
              <span>{searchText}</span>
            ) : (
              <span>{searchProduct}</span>
            )}
          </h2>
        }

        <div className="searchPage__inner">
          <div className="searchPage__products">
            {Object.keys(data).map((id, ind) => {
              return data[id].collectionProducts.map((item, index) => {
                if (searchProduct === item.productName) {
                  productsAmount.push(item);
                  return (
                    <ProductComponent
                      data={data[id].collectionProducts}
                      id={index}
                      collectionId={data[id].collectionId}
                      key={index.toString()}
                    />
                  );
                }
              });
            })}
          </div>
          <div className="pagination">
            <Pagination
              count={Math.round(productsAmount.length / perPage)}
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
          </div>
        </div>
        <RandomProducts data={data} />
      </div>
    </div>
  );
}

export default SearchPage;
