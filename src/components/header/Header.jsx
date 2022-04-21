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
import { getStorage, ref as sRef, getDownloadURL } from "firebase/storage";

function Header() {
  const [data, setData] = useState({});
  const database = getDatabase(app);
  const st = getStorage();

  useEffect(() => {
    getDownloadURL(sRef(st, "about_us/"))
      .then((url) => {
        console.log(url);
        const img = document.querySelector(".header__bottom-logo");
        img.setAttribute("src", url);
        img.setAttribute("alt", "123");
      })
      .catch((error) => {});
  }, []);

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

    return () => {
      setData({});
    };
  }, []);

  // function writeData(id, phone) {
  //   const db = getDatabase();
  //   set(ref(db, "phone/" + id), {
  //     phone: phone,
  //   });
  // }

  // writeData("1", "+996555123456");

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

              {Object.keys(data)
                .sort()
                .map((id, index) => {
                  return <a href={`tel:{data[id].phone}`}>{data[id].phone}</a>;
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
              <img className="header__bottom-logo" />
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
