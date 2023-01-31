import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
import { default as logo_footer } from "../img/logo-footer.png";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { useState, useEffect } from "react";
import { app } from "../Database";
import { db } from "../db";

function Footer() {
    const [contact, setContact] = useState({});
    const [link, setLink] = useState({});

    const database = getDatabase(app);

    useEffect(() => {
        setContact(db.footer.contact);
        setLink(db.footer.social_links);
    }, []);

    // useEffect(() => {
    //     get(child(ref(database), `footer/social_links`))
    //         .then((snapshot) => {
    //             if (snapshot.exists()) {
    //                 setLink({ ...snapshot.val() });
    //             } else {
    //                 setLink({});
    //             }
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }, []);

    return (
        <div className="footer">
            <div className="container">
                {/* <div className="footer__inner"> */}
                <div className="footer__top">
                    <div className="footer__top-logo">
                        <img src={logo_footer} alt="Zeon Store" />
                    </div>
                    <div className="footer__top-nav">
                        <div className="footer__top-section">
                            <div className="section-title">Компания</div>
                            <ul>
                                <li>
                                    <Link to="/about-us">О нас</Link>{" "}
                                </li>
                                <li>
                                    {" "}
                                    <Link to="/news">Новости</Link>
                                </li>
                                <li>
                                    <Link to="/help">Помощь</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="footer__top-section footer__top-contacts">
                            <div className="section-title">Контакты</div>
                            <ul>
                                {Object.keys(contact).map((id, index) => {
                                    return (
                                        <li key={id + index}>
                                            {contact[id].phone.includes("@") ? (
                                                <a
                                                    href={`mailto:${contact[id].phone}`}
                                                >
                                                    {contact[id].phone}
                                                </a>
                                            ) : (
                                                <a
                                                    href={`tel:${contact[id].phone}`}
                                                >
                                                    {contact[id].phone}
                                                </a>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="footer__top-section footer__top-social">
                            <div className="section-title">
                                Мы в социальных сетях:
                            </div>
                            <ul>
                                {Object.keys(link)
                                    .sort()
                                    .map((id, index) => {
                                        return (
                                            <li key={id + index}>
                                                <a href={link[id].links}>
                                                    {link[id].name}
                                                </a>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer__bottom">Developed by Zeon 2022</div>
                {/* </div> */}
            </div>
        </div>
    );
}

export default Footer;
