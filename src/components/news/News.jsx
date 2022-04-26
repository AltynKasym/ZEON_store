import React, { useState, useEffect } from "react";
import "./news.scss";
import { app } from "../Database";
import { getDatabase, ref, child, get } from "firebase/database";

function News() {
  document.addEventListener("DOMContentLoaded", () => {
    document.body.scrollTop = 0;
  });

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

  let [step, setStep] = useState(8);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [step]);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      console.log("step+8");
      setStep(step + 8);
    }
  };

  return (
    <div className="news">
      <div className="container">
        <h1 className="news-title">Новости</h1>
        <ul>
          {Object.keys(data).map((id, index) => {
            if (id > 0 && id <= step)
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
