import React, { useState, useEffect, useContext } from "react";
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
import { Context } from "../context";

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

  const [searchText, setSearchText] = useContext(Context);
  let text;
  function searchInfo() {
    setSearchText(text);
  }

  if (localStorage.getItem("favorites") === null) {
    localStorage.setItem("favorites", JSON.stringify([]));
  }

  if (localStorage.getItem("basket") === null) {
    localStorage.setItem("basket", JSON.stringify([]));
  }

  let favorites = JSON.parse(localStorage.getItem("favorites"));
  const [favoriteSatus, setFavoriteStatus] = useState(false);
  useEffect(() => {
    if (favorites.length !== 0) setFavoriteStatus(true);
    else setFavoriteStatus(false);
  }, [favorites]);

  let basket = JSON.parse(localStorage.getItem("basket"));
  const [basketSatus, setbasketStatus] = useState(false);
  useEffect(() => {
    if (basket.length !== 0) setbasketStatus(true);
    else setbasketStatus(false);
  }, [basket]);

  const [collbackStatus, setCollbackStatus] = useState(false);
  function openCollback() {
    setCollbackStatus(!collbackStatus);
  }

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
              <input
                type="text"
                placeholder="Поиск"
                onChange={(e) => {
                  text = e.target.value.trim();
                }}
              />
              <span
                className="header__bottom-search-icon"
                onClick={searchInfo}
              />

              <span />
            </div>
            <div
              className={
                favoriteSatus
                  ? "header__bottom-icon header__bottom-favoritesHave"
                  : "header__bottom-icon header__bottom-favoritesNo"
              }
            >
              <Link to="/favorites">
                <span>Избранное</span>
              </Link>
            </div>
            <div
              className={
                basketSatus
                  ? "header__bottom-basket header__bottom-basketHave"
                  : "header__bottom-basket header__bottom-basketNo"
              }
            >
              <Link to="/basket">
                <span>Корзина</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="header__breadcrumb"></div>
      <div className="header__connection">
        <div
          className="header__connection-goUp"
          onClick={() => window.scrollTo(0, 0)}
        ></div>
        <div className="header__connection-chat">
          <div
            style={collbackStatus ? { display: "flex" } : { display: "none" }}
          >
            <span className="header__connection-item"></span>
            <span className="header__connection-item"></span>
            <span className="header__connection-item"></span>
          </div>
          <span
            className={
              collbackStatus
                ? "header__connection-controlButton"
                : "header__connection-controlButtonClose"
            }
            onClick={openCollback}
          ></span>
        </div>
      </div>
      {/* <div className="header__modal">
        <h2 className="header__modal-title">Если у Вас остались вопросы</h2>
        <p className="header__modal-text">
          Оставьте заявку и мы обязательно Вам перезвоним
        </p>
        <input
          type="text"
          className="header__modal-input"
          placeholder="Как к Вам обращаться?"
        />
        <input
          type="tel"
          className="header__modal-input"
          placeholder="Номер телефона"
        />
        <button className="header__modal-send">Заказать звонок</button>
      </div> */}
    </header>
  );
}

export default Header;
