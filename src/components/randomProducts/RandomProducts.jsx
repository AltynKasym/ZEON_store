import React, { useState, useEffect, useContext } from "react";
import { ProductComponent } from "../Components";
import { getDatabase, child, get, ref } from "firebase/database";
import { app } from "../Database";
import "./randomProducts.scss";
import { Context } from "../context";

function RandomProducts({ data }) {
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

  // console.log(Math.round(Math.random() * 12), "round 12");
  let collectionId, productId;
  return (
    <div className="related">
      Related Product
      <div className="related__inner">
        {Object.keys(data).map((id, ind) => {
          collectionId = Math.round(Math.random() * 12);
          productId = Math.round(Math.random() * 8);
          console.log(collectionId, productId);

          if (id == collectionId - 1) {
            return data[id].collectionProducts.map((item, index) => {
              if (productId == item.productId)
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
            });
          }
        })}
      </div>
    </div>
  );
}

export default RandomProducts;
