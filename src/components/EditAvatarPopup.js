import PopupWithForm from "./PopupWithForm";
import React, {useEffect, useRef} from "react";
import {useFormWithValidation} from "../hooks/useForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef();
  const {values, errors, isValid, handleChange, resetForm} = useFormWithValidation();

  useEffect(() => {
    resetForm();
  }, [props.isOpen, resetForm]);

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateAvatar(values);
  }

  return (
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      submitButtonText={props.isLoading ? 'Сохранить...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid || props.isLoading}
    >
      <input
        type="url"
        name="avatar"
        className="popup__input popup__input_type_avatar-link"
        id="avatar-link-input"
        placeholder="Ссылка на картинку"
        value={values.avatar || ""}
        onChange={handleChange}
        ref={avatarRef}
        required
      />
      <span id="avatar-link-input-error" className="input-error input-error_avatar">
        {errors.avatar || ""}
      </span>
    </PopupWithForm>
  )

}

export default EditAvatarPopup;
