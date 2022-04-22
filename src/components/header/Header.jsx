import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import { default as logo_header } from "../img/logo-header.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { app } from "../Database";
// import storage from "../Database";
import { getDatabase, child, get, ref, set } from "firebase/database";
import { useState, useEffect } from "react";
// import { getApp } from "firebase/app";
import {
  getStorage,
  ref as sRef,
  getDownloadURL,
  listAll,
} from "firebase/storage";

function Header() {
  const database = getDatabase(app);
  const st = getStorage();

  const [image, setImage] = useState([]);
  const storage = getStorage();

  const listImage = () => {
    listAll(sRef(storage, "zeon/"))
      .then((res) => {
        res.items.forEach((itemref) => {
          getDownloadURL(itemref)
            .then((url) => {
              setImage((image) => [...image, url]);
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

  const [data, setData] = useState({});

  useEffect(() => {
    get(child(ref(database), `phone`))
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

  // function writeData(id, title, text) {
  //   const db = getDatabase();
  //   set(ref(db, "about_us/" + id), {
  //     title: title,
  //     text: text,
  //   });
  // }

  // writeData(
  //   1,
  //   "О Нас",
  //   "У нас Вы найдёте всё, что Вам так нужно. Ассортимент магазина постоянно расширяется и дополняется в зависимости от пожеланий клиентов. Женская одежда из наших коллекций – это комфортная, стильная и качественная одежда не только на каждый день, но и для любых ситуаций по доступным ценам.Натуральные материалы, продуманные силуэты, современный дизайн и возможность легкого сочетания моделей помогут Вам всегда оставаться в центре внимания и чувствовать себя уместно в любой ситуации.Если Вы любите одеваться ярко, модно и оригинально, у нас Вы найдете все необходимое, чтобы всегда быть в центре внимания. У нас большая коллекция для любого торжества и праздника, которая сможет удовлетворить вкус самой взыскательной модницы! А для деловых ситуаций, в которых Вам непременно нужно выглядеть элегантно и стильно, мы предлагаем Вам одежду из коллекции 'деловой стиль и офис'. Мода постоянно диктует нам свои требования и для современной девушки, желающей идти в ногу со временем, важно иметь возможность постоянно пополнять свой гардероб стильной одеждой."
  // );

  return (
    <header className="header">
      <div className="header__top">
        <div className="container">
          <div className="header__top-inner">
            <ul className="header__top-menu">
              <li>
                <Link to="/about-us"> О нас</Link>
              </li>
              <li>
                <Link to="/collections">Коллекции</Link>
              </li>
              <li>
                {" "}
                <Link to="/news">Новости</Link>
              </li>
            </ul>
            <div className="header__top-phone">
              <span>Тел:</span>

              {Object.keys(data).map((id, index) => {
                return (
                  <a key={id + index} href={`tel:${data[id].phone}`}>
                    {data[id].phone}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="header__bottom">
        <div className="container">
          <div className="header__bottom-inner">
            {/* <div className="header__bottom-logo"> */}
            <Link to="/zeon_store">
              {" "}
              {image.map((item, name) => (
                <img
                  className="header__bottom-logo"
                  src={item}
                  alt={name}
                  key="item+id"
                />
              ))}
            </Link>
            {/* </div> */}
            <div className="header__bottom-search">
              <input type="text" placeholder="Поиск" />
              <SearchOutlinedIcon className="header__bottom-search-icon" />
            </div>
            <div className="header__bottom-favorites">
              <FavoriteBorderIcon />
              <span>Избранное</span>
            </div>
            <div className="header__bottom-favorites">
              <ShoppingBasketOutlinedIcon />
              <span>Корзина</span>
            </div>
          </div>
        </div>
      </div>
      <div className="header__breadcrumb"></div>
    </header>
  );
}

export default Header;
