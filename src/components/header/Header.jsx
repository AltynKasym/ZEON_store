import React from "react";
import "./header.scss";
import { default as logo_header } from "../img/logo-header.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

function Header() {
  return (
    <header className="header">
      <div className="header__top">
        <div className="container">
          <div className="header__top-inner">
            <ul className="header__top-menu">
              <li>О нас</li>
              <li>Коллекции</li>
              <li>Новости</li>
            </ul>
            <div className="header__top-phone">
              <span>Тел:</span>
              <a href="tel:+996000000000">+996000000000</a>
            </div>
          </div>
        </div>
      </div>
      <div className="header__bottom">
        <div className="container">
          <div className="header__bottom-inner">
            <div className="header__bottom-logo">
              <img src={logo_header} alt="Zeon Store" />
            </div>
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
    </header>
  );
}

export default Header;
