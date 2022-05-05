import React, { useState, useEffect, useContext } from "react";
import CollectionItem from "../collection/CollectionItem";
import { Collection, NewProduct, ProductComponent } from "../Components";
import Context from "../context";
import { getDatabase, child, get, ref } from "firebase/database";
import { app } from "../Database";
import "./collectionPage.scss";
import Carousel from "nuka-carousel";
import { Link } from "react-router-dom";
import { containerClasses, Pagination, Typography } from "@mui/material";

function CollectionPage() {
  let collectionId = window.location.href.split("/")[4];

  const database = getDatabase(app);
  const [data, setData] = useState({});

  console.log(collectionId);

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
  }, []);

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
    <div className="collectionPage">
      <div className="container">
        <h3 className="productComponent__card-title">
          {/* {data[coll].collectionTitle} */}
        </h3>
        <div className="collectionPage__inner">
          <div className="collectionPage__products">
            {Object.keys(data).map((id, ind) => {
              if (id >= collectionBegin && id <= collectionEnd) {
                return (
                  <div className="collectionPage_inner-block" key={id + ind}>
                    <ProductComponent
                      data={data}
                      id={id}
                      collectionId={collectionId}
                    />
                  </div>
                );
              }
            })}
          </div>

          <div className="collectionPage__pagination">
            <Pagination
              count={Math.round(Object.keys(data).length / perPage)}
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="collectionPage__newProducts">
          <h2 className="collectionPage__newProducts-title">Новинки</h2>
          <NewProduct collectionId={collectionId} />
        </div>
      </div>
    </div>
  );
}

export default CollectionPage;
