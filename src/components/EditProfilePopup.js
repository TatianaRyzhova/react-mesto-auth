import React, {useState, useEffect, useContext} from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      name={'profile'}
      title={'Редактировать профиль'}
      submitButtonText={props.isLoading ? 'Сохранить...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input type="text" name="name" className="popup__input popup__input_type_name" id="name-input"
             value={name || ''} onChange={handleNameChange}
             placeholder="Имя" minLength={2} maxLength={40} required/>
      <span id="name-input-error" className="input-error"/>
      <input type="text" name="title" className="popup__input popup__input_type_title" id="title-input"
             value={description || ''} onChange={handleDescriptionChange}
             placeholder="О себе" minLength={2} maxLength={200} required/>
      <span id="title-input-error" className="input-error"/>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
