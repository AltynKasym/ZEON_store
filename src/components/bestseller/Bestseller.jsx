import React, { useState, useEffect, useContext } from "react";
import { ProductComponent } from "../Components";
import { getDatabase, child, get, ref } from "firebase/database";
import { app } from "../Database";
import "./bestseller.scss";
import { Context } from "../context";

function Bestseller({ data }) {
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

  let number = [];
  // const [data] = useContext(Context);

  return (
    <div className="bestseller">
      <div className="bestseller__inner">
        {Object.keys(data).map((id, ind) => {
          if (id > 0 && id <= 8) {
            return data[id].collectionProducts.map((item, index) => {
              if (item.bestseller) {
                return (
                  <div className="bestseller__product">
                    <ProductComponent
                      data={data[id].collectionProducts}
                      id={index}
                      collectionId={data[id].collectionId}
                      key={item + index}
                    />
                  </div>
                );
              }
            });
          }
        })}
      </div>
    </div>
  );
}

export default Bestseller;
