import React, { useState, useEffect } from "react";
import {
  getStorage,
  ref as sRef,
  getDownloadURL,
  list,
  listAll,
  getMetadata,
} from "firebase/storage";
import { getDatabase, child, get, ref, set } from "firebase/database";
import { app } from "../Database";
import "./collection.scss";

function Collection() {
  const [image, setImage] = useState([]);
  const [imgName, setImgName] = useState([]);
  const storage = getStorage();

  const listImage = () => {
    listAll(sRef(storage, "collection/"))
      .then((res) => {
        res.items.forEach((itemref) => {
          getDownloadURL(itemref)
            .then((url) => {
              setImage((image) => [...image, url]);
            })
            .catch((err) => {
              console.log(err);
            });

          getMetadata(itemref)
            .then((name) => {
              setImgName((name) => [...name.name]);
              console.log(name.name);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    listImage();
  }, []);

  console.log(imgName);

  // getMetadata(sRef(storage, "collection/Коллекция весна 2022.png"))
  //   .then((metadata) => {
  //     console.log(metadata.name);
  //     // Metadata now contains the metadata for 'images/forest.jpg'
  //   })
  //   .catch((error) => {
  //     // Uh-oh, an error occurred!
  //   });

  return (
    <div className="collection">
      Collection
      <div className="container">
        <div className="collection__main">
          {image.map((item, id) => (
            <>
              <img src={item} alt={item} key={item + id} />
              <p>{imgName}</p>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
