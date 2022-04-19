import React from "react";
import "./footer.scss";
import { default as logo_footer } from "../img/logo-footer.png";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__top">
            <div className="footer__top-logo">
              <img src={logo_footer} alt="Zeon Store" />
            </div>
            {/* <div className="footer__top-nav"> */}
            <div className="footer__top-section">
              <div className="section-title">Компания</div>
              <ul>
                <li>О нас</li>
                <li>Новости</li>
                <li>Помощь</li>
              </ul>
            </div>
            <div className="footer__top-section">
              <div className="section-title">Контакты</div>
              <ul>
                <li>
                  <a href="tel:+996500123456">+996500123456</a>
                </li>
                <li>
                  <a href="tel:+996500123456">+996500123456</a>
                </li>
                <li>
                  <a href="mailto:mail@gmail.com">+mail@gmail.com</a>
                </li>
              </ul>
            </div>
            <div className="footer__top-section">
              <div className="section-title">Мы в социальных сетях:</div>
              <ul>
                <li>О нас</li>
                <li>Новости</li>
                <li>Помощь</li>
              </ul>
            </div>
            {/* </div> */}
          </div>
          <div className="footer__bottom">Developed by Zeon 2022</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
