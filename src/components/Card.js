import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;
  const cardRemoveButtonClassName = (
    `cards__remove-button ${isOwn ? 'cards__remove-button' : 'cards__remove-button_hidden'}`
  );

  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `cards__like-button ${isLiked ? 'cards__like-button_active' : 'cards__like-button'}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="cards__group">
      <div className="cards__image-container">
        <img src={props.card.link} alt={props.card.name} className="cards__photo" onClick={handleClick}/>
        <button type="button" aria-label="Remove" className={cardRemoveButtonClassName} onClick={handleDeleteClick}/>
      </div>
      <div className="cards__description-area">
        <p className="cards__description">{props.card.name}</p>
        <div className="cards__like-kit">
          <button type="button" aria-label="Like" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
          <p className="cards__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;
