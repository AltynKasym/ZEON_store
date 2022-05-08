import React, { useState, useEffect, useContext } from "react";
import { ProductComponent } from "../Components";
import { getDatabase, child, get, ref } from "firebase/database";
import { app } from "../Database";
import "./newProduct.scss";
import { Context } from "../context";

function NewProduct({ collectionId = 1, data }) {
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

  // var number = [];
  // const [data] = useContext(Context);

  console.log(data, "newProd data");
  // console.log(collectionId, "collId");

  return (
    <div className="newProduct">
      <div className="newProduct__inner">
        {Object.keys(data).map((id, ind) => {
          if (id == collectionId - 1) {
            return data[id].collectionProducts.map((item, index) => {
              if (item.newProduct) {
                {
                  /* if (ind < 1) */
                }
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
