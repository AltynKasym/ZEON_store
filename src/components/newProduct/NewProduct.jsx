import React, { useState, useEffect, useContext } from "react";
import { ProductComponent } from "../Components";
import { getDatabase, child, get, ref } from "firebase/database";
import { app } from "../Database";
import "./newProduct.scss";
import { Context } from "../context";

function NewProduct({ collectionId = 1, data, amount }) {
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
    <div className="newProduct">
      <div
        className="newProduct__inner"
        style={{ gridTemplateColumns: `repeat(${amount}, 1fr)` }}
      >
        {Object.keys(data).map((id, ind) => {
          if (id == collectionId - 1) {
            return data[id].collectionProducts.map((item, index) => {
              if (item.newProduct) {
                number.push(item);
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
    </div>
  );
}

export default NewProduct;
