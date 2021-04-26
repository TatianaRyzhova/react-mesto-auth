import PopupWithForm from "./PopupWithForm";
import React, {useEffect} from "react";
import {useFormWithValidation} from "../hooks/useForm";

function AddPlacePopup(props) {

  const {values, errors, isValid, handleChange, resetForm} = useFormWithValidation();

  useEffect(() => {
    resetForm();
  }, [props.isOpen, resetForm]);

  function handleSubmit(event) {
    event.preventDefault();
    props.onAddPlace(values);
  }

  return (
    <PopupWithForm
      name={'card'}
      title={'Новое место'}
      submitButtonText={props.isLoading ? 'Сохранить...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid || props.isLoading}
    >
      <input type="text" name="name" className="popup__input popup__input_type_card-title" id="card-title-input"
             value={values.name || ""} onChange={handleChange}
             placeholder="Название" minLength={2} maxLength={30} required/>
      <span id="card-title-input-error" className="input-error">
        {errors.name || ""}
      </span>
      <input type="url" name="link" className="popup__input popup__input_type_card-link" id="card-link-input"
             value={values.link || ""} onChange={handleChange}
             placeholder="Ссылка на картинку" required/>
      <span id="card-link-input-error" className="input-error">
        {errors.link || ""}
      </span>
    </PopupWithForm>
  )

}

export default AddPlacePopup;
