import React, { useState, useEffect, useContext } from "react";
import { Collection, NewProduct, ProductComponent } from "../Components";
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

  const [searchText, setSearchText] = useContext(Context);

  const [page, setPage] = useState(1);
  const [collectionBegin, setCollectionBegin] = useState(0);
  const [collectionEnd, setCollectionEnd] = useState(3);
  const perPage = 4;

  const handleChange = function (event, value) {
    setPage(value);
    setCollectionBegin(value * perPage - perPage);
    setCollectionEnd(value * perPage - 1);
  };

  return (
    <div className="favorites">
      <div className="container">
        <p className="favorites__card-amount">
          Результаты поиска по запросу: <span>{searchText}</span>
        </p>
        <div className="favorites__inner">
          <div className="favorites__products">
            {Object.keys(data).map((id, ind) => {
              if (ind >= collectionBegin && ind <= collectionEnd) {
                return data[id].collectionProducts.map((item, index) => {
                  if (item.productName.includes(searchText)) {
                    return (
                      <ProductComponent
                        data={data[id].collectionProducts}
                        id={index}
                        collectionId={data[id].collectionId}
                        key={item + index}
                      />
                    );
                  }
                });
              }
            })}
          </div>
          <div className="pagination">
            <Pagination
              count={Math.round(Object.keys(data).length / perPage)}
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
