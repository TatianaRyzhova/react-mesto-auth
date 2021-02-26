import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__picture-kit">
          <img src={currentUser.avatar} alt="#" className="profile__picture"/>
          <div className="profile__overlay" onClick={props.onEditAvatar}/>
        </div>
        <div className="profile__info">
          <div className="profile__name-kit">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" aria-label="Edit" className="profile__edit-button" onClick={props.onEditProfile}/>
          </div>
          <p className="profile__title">{currentUser.about}</p>
        </div>
        <button type="button" aria-label="Add" className="profile__add-button" onClick={props.onAddPlace}/>
      </section>

      <div id="cards-template" className="cards">
        {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          )
        )}
      </div>
    </main>
  )
}

export default Main;
