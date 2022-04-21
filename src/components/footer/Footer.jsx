import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
import { default as logo_footer } from "../img/logo-footer.png";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { useState, useEffect } from "react";
import { app } from "../Database";

function Footer() {
  const [contact, setContact] = useState({});
  const [link, setLink] = useState({});

  const database = getDatabase(app);

  useEffect(() => {
    get(child(ref(database), `footer/contact`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setContact({ ...snapshot.val() });
        } else {
          setContact({});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    get(child(ref(database), `footer/social_links`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setLink({ ...snapshot.val() });
        } else {
          setLink({});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Запись в firebase

  // function writeData(Id, name, links) {
  //   const db = getDatabase();
  //   set(ref(db, "footer/social_links/" + Id), {
  //     name: name,
  //     links: links,
  //   });
  // }

  // writeData("3", "Whatsapp", "https://whatsapp.com");

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
                      <a href={`tel:${contact[id].phone}`}>
                        {contact[id].phone}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="footer__top-section footer__top-social">
              <div className="section-title">Мы в социальных сетях:</div>
              <ul>
                {Object.keys(link)
                  .sort()
                  .map((id, index) => {
                    return (
                      <li key={id + index}>
                        <a href={link[id].links}>{link[id].name}</a>
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
