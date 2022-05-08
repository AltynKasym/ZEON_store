import React from "react";
import { Collection, MainSlider, NewProduct } from "../Components";

function MainPage({ data }) {
  return (
    <div className="mainPage">
      <div className="container">
        <MainSlider />
        <div className="mainPage__new-products">
          <h2>Новинки</h2>
          <NewProduct collectionId={1} data={data} />
        </div>
        <div className="mainPage__collections">
          <h2>Коллекции</h2>
          {/* <Collection data={data} /> */}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
