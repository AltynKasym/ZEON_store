import React, { useState, useEffect, useContext } from "react";
import { ProductComponent } from "../Components";
import { getDatabase, child, get, ref } from "firebase/database";
import { app } from "../Database";
import "./newProduct.scss";

function NewProduct({ collectionId, amount }) {
  // let collectionId = window.location.href.split("/")[4];

  const database = getDatabase(app);
  const [data, setData] = useState({});

  useEffect(() => {
    get(child(ref(database), `collection/`))
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

  var number = [];

  return (
    <div className="newProduct">
      <div className="newProduct__inner">
        {Object.keys(data).map((id, ind) => {
          if (id == collectionId - 1) {
            return data[id].collectionProducts.map((item, index) => {
              if (item.newProduct) {
                {
                  /* number.push(index);
                console.log(item, "id  ");
                console.log(index, "index  ");
                console.log(number, "number  ");
                console.log(number.length, "шт"); 
                  console.log(item, "id  ");*/
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
          {
            /* console.log(Math.ceil(Math.random() * number.length), "random"); */
          }
        })}
      </div>
    </div>
  );
}

export default NewProduct;
