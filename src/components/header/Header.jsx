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
import { ModalWindow } from "../Components";
import logoHeader from "../img/logo-header.png";
import { db } from "../db";

function Header({ data }) {
    const [phone, setPhone] = useState({});

    useEffect(() => {
        setPhone(db.phone);
        // window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    }, []);

    const [openSearch, setOpenSearch] = useState(false);
    function searchSlider() {
        setOpenSearch(!openSearch);
    }

    const [openMenu, setOpenMenu] = useState(false);
    function menuSlider() {
        setOpenMenu(!openMenu);
    }

    const [openChat, setOpenChat] = useState(false);

    const [searchText, setSearchText, searchProduct, setSearchProduct] =
        useContext(Context);
    // const [searchProduct, setSearchProduct] = useContext(Context);
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
        favorites.length ? setFavoriteStatus(true) : setFavoriteStatus(false);
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

    let collectionId = window.location.href.split("/")[5];

    let products = new Set();
    let productsList = [];

    const [closeSearch, setCloseSearch] = useState(false);
    useEffect(() => {
        setCloseSearch(false);
    }, [searchText]);

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

                            {Object.keys(phone).map((id, index) => {
                                return (
                                    <a
                                        key={id + index}
                                        href={`tel:${phone[id].phone}`}
                                    >
                                        {phone[id].phone}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div
                    className="header__mobile-search"
                    style={
                        openSearch ? { display: "block" } : { display: "none" }
                    }
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
                            onClick={
                                window.screen.width <= 700
                                    ? menuSlider
                                    : searchInfo
                            }
                        ></MenuRoundedIcon>
                        <a href="/zeon_store">
                            <img
                                className="header__bottom-logo"
                                src={logoHeader}
                                alt="Zeon Store"
                            />
                        </a>
                        {/* </div> */}
                        <div className="header__bottom-search">
                            <input
                                type="text"
                                placeholder="Поиск"
                                // value={closeSearch ? searchProduct : ""}
                                onChange={(e) => {
                                    setSearchText(e.target.value.trim());
                                }}
                            />
                            <Link
                                to={`/search/`}
                                style={{ display: "inline-block" }}
                            >
                                <span
                                    className="header__bottom-search-icon"
                                    onClick={searchInfo}
                                />
                            </Link>
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

            <ul className="searchPage__searchList">
                {Object.keys(data).map((id, ind) => {
                    return data[id].collectionProducts.map((item, index) => {
                        products.add(item.productName);
                        productsList = [...products];
                    });
                })}
                {productsList.map((productName, ind) => {
                    if (typeof searchText == "string") {
                        if (
                            productName
                                .toLowerCase()
                                .includes(searchText.toLowerCase())
                        )
                            return (
                                <Link to="/search">
                                    <li
                                        style={
                                            closeSearch
                                                ? { display: "none" }
                                                : { display: "block" }
                                        }
                                        className="searchPage__searchText"
                                        onClick={(e) => {
                                            setSearchProduct(
                                                e.target.innerText
                                            );
                                            setCloseSearch(true);
                                        }}
                                        key={productName + ind}
                                    >
                                        {productName}
                                    </li>
                                </Link>
                            );
                    }
                })}
            </ul>

            <div className="header__breadcrumb">
                <div className="container">
                    {" "}
                    <Link to="/zeon_store">Главная</Link>
                    {Object.keys(data).map((id, ind) => {
                        if (id == collectionId - 1) {
                            return (
                                <span key={id + ind}>
                                    {data[id].collectionTitle}
                                </span>
                            );
                        }
                    })}
                </div>
            </div>

            <div className="header__connection">
                <div
                    className="header__connection-goUp"
                    onClick={() => window.scrollTo(0, 0)}
                ></div>
                <div className="header__connection-chat">
                    <div
                        style={
                            collbackStatus
                                ? { display: "flex" }
                                : { display: "none" }
                        }
                    >
                        <a href="http://t.me">
                            <span className="header__connection-telegram"></span>
                        </a>
                        <a href="http://whatsapp.com">
                            <span className="header__connection-whatsapp"></span>
                        </a>

                        <span
                            className="header__connection-item"
                            onClick={() => setOpenChat(!openChat)}
                        ></span>
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

            <div
                className="header__window"
                style={openChat ? { display: "block" } : { display: "none" }}
            >
                <ModalWindow />
            </div>
        </header>
    );
}

export default Header;
