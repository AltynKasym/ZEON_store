import React, { useState, useEffect } from "react";
import { app } from "../Database";
import { getDatabase, child, get, ref, set } from "firebase/database";
import "./offer.scss";

function Offer() {
  const database = getDatabase(app);
  const [data, setData] = useState({});

  useEffect(() => {
    get(child(ref(database), `offer`))
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

  return (
    <div className="offer">
      <div className="container">
        <h1 className="offer__title">Публичная офферта</h1>

        {Object.keys(data).map((id, index) => {
          return (
            <div
              className="offer__text"
              key={id + index}
              dangerouslySetInnerHTML={{
                __html: `${data[id].offerText}`,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default Offer;
