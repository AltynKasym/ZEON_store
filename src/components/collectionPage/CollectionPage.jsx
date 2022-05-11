import React, { useState, useEffect, useContext } from "react";
import { Collection, NewProduct, ProductComponent } from "../Components";
import { Context } from "../context";
import { getDatabase, child, get, ref } from "firebase/database";
import { app } from "../Database";
import "./collectionPage.scss";
import Carousel from "nuka-carousel";
import { Link } from "react-router-dom";
import { containerClasses, Pagination, Typography } from "@mui/material";

function CollectionPage({ data }) {
  let collectionId = window.location.href.split("/")[4];

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

  const perPage = 12;
  const [page, setPage] = useState(1);
  const [collectionBegin, setCollectionBegin] = useState(0);
  const [collectionEnd, setCollectionEnd] = useState(perPage - 1);

  let alldata = [];

  const handleChange = function (event, value) {
    window.scrollTo(0, 0);
    setPage(value);
    setCollectionBegin(value * perPage - perPage);
    setCollectionEnd(value * perPage - 1);
  };

  return (
    <div className="collectionPage">
      <div className="container">
        <h3 className="collectionPage__card-title">
          {Object.keys(data).map((id, ind) => {
            if (id == collectionId - 1) return data[id].collectionTitle;
          })}
        </h3>
        <div className="collectionPage__inner">
          <div className="collectionPage__products">
            {Object.keys(data).map((id, ind) => {
              if (id == collectionId - 1) {
                return data[id].collectionProducts.map((item, index) => {
                  alldata.push(item);
                  if (index >= collectionBegin && index <= collectionEnd) {
                    return (
                      <>
                        <ProductComponent
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
            })}
          </div>

          <div className="pagination">
            <Pagination
              count={Math.round(alldata.length / perPage)}
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="collectionPage__newProducts">
          <h2 className="collectionPage__newProducts-title">Новинки</h2>
          <NewProduct collectionId={collectionId} data={data} amount={5} />
        </div>
      </div>
    </div>
  );
}

export default CollectionPage;
