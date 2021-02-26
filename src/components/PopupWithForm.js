import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__content">
        <button type="button" aria-label="Close"
                className={`popup__close-button popup__close-button_${props.name}`}
                onClick={props.onClose}
        />
        <h2 className="popup__title">{props.title}</h2>
        <form name={`${props.name}Data`} className={`popup__form popup__${props.name}-form`} onSubmit={props.onSubmit}
              noValidate>
          {props.children}
          <button type="submit" aria-label="Save" className="popup__save-button">{props.submitButtonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
