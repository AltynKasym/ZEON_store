import React, { useState, useEffect } from "react";
// import {   getStorage,   ref as sRef,   getDownloadURL,   list,   listAll, } from "firebase/storage";
import { getDatabase, child, get, ref, set } from "firebase/database";
import { app } from "../Database";
import "./aboutUs.scss";

function AboutUs() {
  const database = getDatabase(app);
  const [data, setData] = useState({});

  useEffect(() => {
    get(child(ref(database), `about_us/`))
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
    <div className="about-us">
      <div className="container">
        <div className="about-us__inner">
          <div className="about-us__media">
            {Object.keys(data).map((id, index) => {
              return data[id].img.map((item, name) => (
                <img src={item} alt={name} key={item + name} />
              ));
            })}
          </div>
          <div className="about-us__info">
            {Object.keys(data).map((id, index) => {
              return (
                <div key={id + index}>
                  <h1 className="about-us__info-title">{data[id].title}</h1>
                  <p className="about-us__info-text">{data[id].text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
