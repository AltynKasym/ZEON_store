import React, { useState, useEffect } from "react";
import "./header.scss";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { app } from "../Database";
import { getDatabase, child, get, ref, set } from "firebase/database";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
  getStorage,
  ref as sRef,
  getDownloadURL,
  listAll,
} from "firebase/storage";

function Header() {
  const database = getDatabase(app);

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

  // function writeData(id, collectionTitle, collectionImg) {
  //   const db = getDatabase();
  //   set(ref(db, "collection/" + collectionTitle), {
  //     collectionId: id,
  //     collectionTitle: collectionTitle,
  //     collectionImg: collectionImg,
  //   });
  // }

  // writeData(9, "В гости", "../img/collections/В гости.jpg");

  const [openSearch, setOpenSearch] = useState(false);
  function searchSlider() {
    setOpenSearch(!openSearch);
  }

  const [openMenu, setOpenMenu] = useState(false);
  function menuSlider() {
    setOpenMenu(!openMenu);
  }

  const inputHandler = (e) => {
    console.log(e.target.value);
  };

  function searchInfo() {}

  return (
    <header className="header">
      <div className="header__top">
        <div className="container">
          <div
            className="header__top-inner"
            style={
              window.screen.width <= 700
                ? openMenu
                  ? { display: "flex" }
                  : { display: "none" }
                : { display: "flex" }
            }
          >
            <ul
              className="header__top-menu"
              style={
                window.screen.width <= 700
                  ? openMenu
                    ? { display: "flex" }
                    : { display: "none" }
                  : { display: "flex" }
              }
            >
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
        <div
          className="header__mobile-search"
          style={openSearch ? { display: "block" } : { display: "none" }}
        >
          Поиск
        </div>
      </div>
      <div className="header__bottom">
        <div className="container">
          <div className="header__bottom-inner">
            {/* <div className="header__bottom-logo"> */}
            <MenuRoundedIcon
              className="header__bottom-menu "
              onClick={window.screen.width <= 700 ? menuSlider : searchInfo}
            ></MenuRoundedIcon>
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
              <input type="text" placeholder="Поиск" onChange={inputHandler} />
              <SearchOutlinedIcon
                className="header__bottom-search-icon"
                onClick={searchSlider}
              />
            </div>
            <div className="header__bottom-favorites">
              <FavoriteBorderIcon />
              <span>Избранное</span>
            </div>
            <div className="header__bottom-favorites header__bottom-basket">
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
