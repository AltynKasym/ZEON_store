import React, { useState, useEffect } from "react";
import "./news.scss";
import { app } from "../Database";
import { getDatabase, ref, child, get, set } from "firebase/database";
import {
  getStorage,
  ref as sRef,
  getDownloadURL,
  list,
  listAll,
} from "firebase/storage";

function News() {
  const [data, setData] = useState({});
  const database = getDatabase(app);

  useEffect(() => {
    get(child(ref(database), `news/`))
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
    <div className="news">
      <div className="container">
        <h1 className="news-title">Новости</h1>
        <ul>
          {Object.keys(data).map((id, index) => {
            return (
              <li className="news__inner" key={id + index}>
                <img
                  className="news__img"
                  src={data[id].newsImg}
                  alt="Помощь"
                />
                <div className="news__info">
                  {/* <span>{id}</span> */}
                  <h3 className="news__info-title">{data[id].newsTitle}</h3>
                  <p className="news__info-text">{data[id].newsText}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default News;
