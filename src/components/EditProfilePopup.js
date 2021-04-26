import React, {useContext, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {useFormWithValidation} from "../hooks/useForm";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const {values, errors, isValid, handleChange, setValues} = useFormWithValidation();

  useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name={'profile'}
      title={'Редактировать профиль'}
      submitButtonText={props.isLoading ? 'Сохранить...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid || props.isLoading}
    >
      <input type="text" name="name" className="popup__input popup__input_type_name" id="name-input"
             value={values.name || ''} onChange={handleChange}
             placeholder="Имя" minLength={2} maxLength={40} required/>
      <span id="name-input-error" className="input-error">
        {errors.name || ""}
      </span>
      <input type="text" name="about" className="popup__input popup__input_type_title" id="title-input"
             value={values.about || ''} onChange={handleChange}
             placeholder="О себе" minLength={2} maxLength={200} required/>
      <span id="title-input-error" className="input-error">
        {errors.about || ""}
      </span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
