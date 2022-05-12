import React from "react";
import "./privilege.scss";

function Privilege() {
  return (
    <div className="privelege">
      <div className="privelege__inner">
        <div className="privelege__block">
          <h3 className="privelege__block-title">Удобные способы оплаты</h3>
          <p className="privelege__block-text">
            Мы предлагаем возможность безналичной оплаты
          </p>
        </div>
        <div className="privelege__block">
          <h3 className="privelege__block-title">Cвоевремнная доставка</h3>
          <p className="privelege__block-text">
            100% гарантия возврата товара - 14 дней на возврат, без скандалов и
            истерик.
          </p>
        </div>
        <div className="privelege__block">
          <h3 className="privelege__block-title">
            Профессиональная консультация
          </h3>
          <p className="privelege__block-text">
            Мы проконсультируем и индивидуально подойдем к Вашему заказу
          </p>
        </div>
        <div className="privelege__block">
          <h3 className="privelege__block-title">
            Акции и бонусы для покупателей
          </h3>
          <p className="privelege__block-text">
            Промокоды со скидками для постоянных клиентов, акции на новые
            позиции
          </p>
        </div>
      </div>
    </div>
  );
}

export default Privilege;
