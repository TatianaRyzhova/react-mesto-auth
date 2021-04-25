import React from "react";

function ImagePopup(props) {

  const isOpen = !!props.card;

  React.useEffect(() => {
    if (!isOpen) return;
    const handleEscapeClose = (event) => {
      if (event.key === "Escape") {
        props.onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [isOpen, props.onClose]);

  const handleOverlayClose = (event) => {
    if ((event.target.classList.contains('popup') || event.target.classList.contains('overlay')) && isOpen) {
      console.log('I am here to close');
      props.onClose();
    }
  }

  return (
    <div className={`popup popup_type_image ${props.card ? 'popup_opened' : ''}`}
         onMouseDown={handleOverlayClose}>
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
