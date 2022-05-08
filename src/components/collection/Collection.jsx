import React, { useState, useEffect, useContext } from "react";
import { getDatabase, child, get, ref } from "firebase/database";
import { app } from "../Database";
import "./collection.scss";
import { containerClasses, Pagination, Typography } from "@mui/material";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { CollectionPage } from "../Components";
import { IndeterminateCheckBox } from "@mui/icons-material";
import Context from "../context";

function Collection({ data }) {
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
    <div className="collection">
      <div className="container">
        <h1 className="collection__title">Коллекции</h1>
        <div className="collection__inner">
          {Object.keys(data).map((id, index) => {
            if (index >= collectionBegin && index <= collectionEnd) {
              return (
                <div className="collection__card" key={index + id}>
                  <Link to={`${data[id].collectionId}`}>
                    <img
                      className="collection__card-photo"
                      src={data[id].collectionImg}
                      alt={data[id].collectionTitle}
                      data_id={data[id].collectionId}
                    />
                  </Link>
                  <p className="collection__card-text">
                    {data[id].collectionTitle}
                  </p>

                  <Link to={`${data[id].collectionId}`}>
                    <div className="collection__card-link">Смотреть все</div>
                  </Link>
                  <Routes>
                    <Route
                      path={`${data[id].collectionId}`}
                      element={<CollectionPage />}
                    />
                  </Routes>
                </div>
              );
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
  );
}

export default Collection;
