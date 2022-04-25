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

  // function writeData(id, newsTitle, newsText) {
  //   const db = getDatabase();
  //   set(ref(db, "news/" + id), {
  //     newsTitle: newsTitle,
  //     newsText: newsText,
  //   });
  // }

  // writeData(
  //   18,
  //   "Lorem ipsum dolor sit amet",
  //   "Sit ullamcorper at gravida quis feugiat. Laoreet leo dolor, dui eget sit viverra justo, malesuada. Viverra pharetra, augue neque felis enim dui id cum. At pellentesque diam nulla ac amet quisque quis. Est consectetur ullamcorper curabitur quis viverra hac molestie. Elit pulvinar congue ut amet adipiscing felis tincidunt. Amet quis varius aliquam hendrerit tempus. Sed sit diam quis scelerisque congu econgu econgu econguecongu econguecon guecon guecon guecong ueconguecong uec ongue.Sit ullamcorper at gravida quis feugiat. Laoreet leo dolor, dui eget sit viverra justo, malesuada. Viverra pharetra, augue neque  Sit ullamcorper at gravida quis feugiat. Laoreet leo dolor, dui eget sit viverra justo, malesuada. Viverra pharetra, augue neque felis enim dui id cum. At pellentesque diam nulla ac amet quisque quis. Est consectetur ullamcorper curabitur quis viverra hac molestie. Elit pulvinar congue ut amet adipiscing felis tincidunt. Amet quis varius aliquam hendrerit tempus. Sed sit diam quis. "
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
            <a href="/zeon_store">
              {" "}
              {image.map((item, name) => (
                <img
                  className="header__bottom-logo"
                  src={item}
                  alt={name}
                  key="item+id"
                />
              ))}
            </a>
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
