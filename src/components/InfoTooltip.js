import React from "react";
import authFailureImage from "../images/auth-failure.jpg";
import authSuccessImage from "../images/auth-success.jpg";

function InfoTooltip(props) {
  return(
    <div className={`popup popup_type_info-tooltip ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__content">
        <button type="button" aria-label="Close"
                className="popup__close-button"
                onClick={props.onClose}
        />
        <div className="info-tooltip">
          <img src={props.success ? authSuccessImage : authFailureImage} alt="Ответ от регистрации" className="info-tooltip__image"/>
          <p className="info-tooltip__message">
            {props.success ?
              "Вы успешно зарегистрировались!" :
              "Что-то пошло не так!\n Попробуйте ещё раз."
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip;
