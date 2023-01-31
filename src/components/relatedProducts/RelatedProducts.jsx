import React, { useState, useEffect, useContext } from "react";
import { ProductComponent } from "../Components";
import { getDatabase, child, get, ref } from "firebase/database";
import { app } from "../Database";
import "./relatedProducts.scss";
import { Context } from "../context";

function RelatedProducts({ collectionId = 1, data, productId }) {
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

  return (
    <div className="related">
      Related Product
      <div className="related__inner">
        {Object.keys(data).map((id, ind) => {
          if (id == collectionId - 1) {
            return data[id].collectionProducts
              .slice(0, 6)
              .map((item, index) => {
                if (productId - 1 !== index)
                  return (
                    <ProductComponent
                      data={data[id].collectionProducts}
                      id={index}
                      collectionId={data[id].collectionId}
                      key={item + index}
                    />
                  );
              });
          }
        })}
      </div>
    </div>
  );
}

export default RelatedProducts;
