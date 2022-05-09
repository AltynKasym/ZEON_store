import React, { useEffect, useState } from "react";
import "./modalWindow.scss";
import { app } from "../Database";
import { getDatabase, child, get, ref, set } from "firebase/database";
import { Link } from "react-router-dom";

function ModalWindow() {
  const [username, setUsername] = useState("");
  const [usertext, setUsertext] = useState("");
  const [openWindow, setOpenWindow] = useState(false);
  const [closeWindow, setCloseWindow] = useState(false);
  let name, text;

  // useEffect(() => {
  //   setOpenWindow(!openWindow);
  // }, []);

  function sendData(e, username, usertext) {
    setOpenWindow(!openWindow);
    e.prevent.default();

    setUsername(name);
    setUsertext(text);
    // const id = `${new Date().getTime()}`;
    const db = getDatabase();
    set(ref(db, "feedback/" + new Date().getTime()), {
      username: username,
      usertext: usertext,
    });
    // e.prevent.default();
  }

  // sendData(new Date().getTime(), username, usertext);

  // sendData(1, "ALty", "0708");
  // writeData();

  return (
    <>
      <div
        className="background"
        style={
          openWindow || closeWindow ? { display: "none" } : { display: "block" }
        }
      ></div>
      <div
        className="modal"
        style={
          openWindow || closeWindow ? { display: "none" } : { display: "flex" }
        }
      >
        <h2 className="modal-title">Если у Вас остались вопросы</h2>
        <p className="modal-text">
          Оставьте заявку и мы обязательно Вам перезвоним
        </p>
        <div>
          <form name="form" id="formId" onSubmit={sendData}>
            <span className="modal-person"></span>
            <input
              required
              type="text"
              id="firstName"
              className="modal-input"
              placeholder="Как к Вам обращаться?"
              onChange={(e) => setUsername(e.target.value.trim())}
            />
            <span className="modal-phone"></span>
            <input
              required
              type="tel"
              id="phone"
              className="modal-input"
              placeholder="Номер телефона"
              onChange={(e) => setUsertext(e.target.value.trim())}
            />
            <input
              type="submit"
              value="Заказать звонок"
              className="modal-send"
            />
          </form>
        </div>

        <span
          className="modal-close"
          onClick={() => setCloseWindow(true)}
        ></span>
      </div>
      <div
        className="modal__sent"
        style={openWindow ? { display: "block" } : { display: "none" }}
      >
        <span className="modal__sent-img"></span>

        <h2 className="modal__sent-title">Спасибо!</h2>
        <p className="modal__sent-text">
          Ваша заявка была принята ожидайте, скоро Вам перезвонят!
        </p>
        <Link to="/zeon_store">
          <button className="modal__sent-button">Продолжить покупки</button>
        </Link>
      </div>
    </>
  );
}

export default ModalWindow;
