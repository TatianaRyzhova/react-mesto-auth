import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.card ? 'popup_opened' : ''}`}>
      <div className="overlay"/>
      <div className="popup__content-zoomed">
        <button type="button" aria-label="Close"
                className="popup__close-button popup__close-button_image"
                onClick={props.onClose}
        />
        <form name="imageData" className=" popup__image-form">
          <img src={props.card ? props.card.link : '#'} alt={props.card ? props.card.name : ''}
               className="zoomed-photo"/>
          <div className="caption">{props.card ? props.card.name : ''}</div>
        </form>
      </div>
    </div>
  )
}

export default ImagePopup;
