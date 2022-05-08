import React from "react";
import "./modalWindow.scss";

function ModalWindow() {
  return (
    <div className="modal">
      <h2 className="modal-title">Если у Вас остались вопросы</h2>
      <p className="modal-text">
        Оставьте заявку и мы обязательно Вам перезвоним
      </p>
      <div>
        <span className="modal-person"></span>
        <input
          type="text"
          id="name"
          className="modal-input"
          placeholder="Как к Вам обращаться?"
        />
        <span className="modal-phone"></span>
        <input
          type="tel"
          id="tel"
          className="modal-input"
          placeholder="Номер телефона"
        />{" "}
      </div>

      <button className="modal-send">Заказать звонок</button>
      <span className="modal-close"></span>
    </div>
  );
}

export default ModalWindow;
