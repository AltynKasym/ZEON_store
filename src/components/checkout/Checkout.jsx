import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./checkout.scss";
import { app } from "../Database";
import { getDatabase, child, get, ref, set } from "firebase/database";
import { Link } from "react-router-dom";

function Checkout() {
    const [username, setUsername] = useState("");
    const [usertext, setUsertext] = useState("");
    const [openWindow, setOpenWindow] = useState(false);
    const [closeWindow, setCloseWindow] = useState(false);

    const initialState = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        city: "",
    };
    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});

    const { firstName, lastName, email, phone, country, city } = state;

    const { id } = useParams();
    // console.log(id);

    useEffect(() => {
        if (id) {
            setState({ ...data[id] });
        } else {
            setState({ ...initialState });
        }
        return () => {
            setState({ ...initialState });
        };
    }, [id, data]);

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const sendData = (e) => {
        setOpenWindow(!openWindow);
        e.preventDefault();
        const db = getDatabase();
        set(ref(db, `checkout/${id}`), state, (err) => {
            if (err) {
                alert(err);
            } else alert("Новость добавлена");
        });

        setState({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            country: "",
            city: "",
        });
    };

    return (
        <>
            <div
                className="background"
                style={
                    openWindow || closeWindow
                        ? { display: "none" }
                        : { display: "block" }
                }
            ></div>
            <div
                className="checkout"
                style={
                    openWindow || closeWindow
                        ? { display: "none" }
                        : { display: "flex" }
                }
            >
                <h2 className="checkout__title">Оформление заказа</h2>

                <div>
                    <form name="form" id="formId" onSubmit={() => sendData()}>
                        <label className="checkout__input-text">
                            Ваше имя
                            <input
                                required
                                type="text"
                                id="firstName"
                                className="checkout__input"
                                placeholder="Например Иван"
                                name="firstName"
                                value={firstName || ""}
                                onChange={inputHandler}
                            />
                        </label>
                        <label className="checkout__input-text">
                            Ваше фамилия
                            <input
                                required
                                type="text"
                                id="lastName"
                                className="checkout__input"
                                placeholder="Например Иванов"
                                name="lastName"
                                value={lastName || ""}
                                onChange={inputHandler}
                            />
                        </label>
                        <label className="checkout__input-text">
                            Электронная почта
                            <input
                                required
                                type="text"
                                id="email"
                                className="checkout__input"
                                placeholder="example@gmail.com"
                                name="email"
                                value={email || ""}
                                onChange={inputHandler}
                            />
                        </label>
                        <label className="checkout__input-text">
                            Ваш номер телефона
                            <input
                                required
                                type="text"
                                id="phone"
                                className="checkout__input"
                                placeholder="Введите номер телефона"
                                name="phone"
                                value={phone || ""}
                                onChange={inputHandler}
                            />
                        </label>
                        <label
                            className="checkout__input-text"
                            htmlFor="country"
                        >
                            Страна
                        </label>
                        <input
                            required
                            type="text"
                            id="country"
                            className="checkout__input"
                            placeholder="Введите страну"
                            name="country"
                            value={country || ""}
                            onChange={inputHandler}
                        />
                        <label className="checkout__input-text">
                            город
                            <input
                                required
                                type="text"
                                id="city"
                                className="checkout__input"
                                placeholder="Введите город"
                                name="city"
                                value={city || ""}
                                onChange={inputHandler}
                            />
                        </label>
                        <div className="checkout__input-boxcheckbox">
                            <input
                                required
                                type="checkbox"
                                id="checkbox"
                                className="checkout__input-checkbox"
                            />
                            <label
                                className="checkout__input-checkboxText "
                                htmlFor="checkbox"
                            >
                                Согласен с условиями{" "}
                                <a href="/offer"> публичной оферты</a>
                            </label>
                        </div>
                        <input
                            type="submit"
                            value="Заказать"
                            className="checkout-send"
                        />
                    </form>
                </div>

                <span
                    className="checkout-close"
                    onClick={() => setCloseWindow(true)}
                ></span>
            </div>
            <div
                className="checkout__sent"
                style={openWindow ? { display: "block" } : { display: "none" }}
            >
                <span className="checkout__sent-img"></span>

                <h2 className="checkout__sent-title">Спасибо!</h2>
                <p className="checkout__sent-text">
                    Ваша заявка была принята ожидайте, скоро Вам перезвонят!
                </p>
                <Link to="/zeon_store">
                    <button className="checkout__sent-button">
                        Продолжить покупки
                    </button>
                </Link>
            </div>
        </>
    );
}

export default Checkout;
