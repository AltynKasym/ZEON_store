import React, { useState } from "react";
import {
  CollectionPage,
  MainSlider,
  NewProduct,
  Bestseller,
} from "../Components";
import { Routes, Route, Outlet, Link } from "react-router-dom";

function MainPage({ data }) {
  const [step, setStep] = useState(1);
  const [collectionBegin, setCollectionBegin] = useState(0);
  const [collectionEnd, setCollectionEnd] = useState(3);
  const perPage = 4;

  const showRest = function () {
    setStep(step + 1);
    // setCollectionBegin(step * perPage - perPage);
    setCollectionEnd(collectionEnd + perPage);
  };

  return (
    <div className="mainPage">
      <div className="container">
        <MainSlider />
        <div className="mainPage__bessteller">
          <h2 className="mainPage__title">ХИТ продаж</h2>
          <Bestseller data={data} />
        </div>

        <div className="mainPage__new-products">
          <h2 className="mainPage__title">Новинки</h2>
          <NewProduct data={data} amount={4} />
        </div>

        <div className="mainPage__collections">
          <h2 className="mainPage__title">Коллекции</h2>
          <div className="collection__inner">
            {Object.keys(data).map((id, index) => {
              if (id >= 0 && id <= collectionEnd) {
                /* if (index >= collectionBegin && index <= collectionEnd) { */

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
              {
                /* } */
              }
            })}
          </div>
          <button className="mainPage__button" onClick={showRest}>
            Еще
          </button>
        </div>
        <div className="mainPage__privilege">
          <h2 className="mainPage__title">Наши преимущества</h2>
          <div className="mainPage__privilege-inner"></div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
