import PopupWithForm from "./PopupWithForm";
import React, {useRef} from "react";

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
    avatarRef.current.value = '';
  }

  return (
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      submitButtonText={props.isLoading ? 'Сохранить...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input type="url" name="link" className="popup__input popup__input_type_avatar-link" id="avatar-link-input"
             placeholder="Ссылка на картинку" ref={avatarRef} required/>
      <span id="avatar-link-input-error" className="input-error input-error_avatar"/>
    </PopupWithForm>
  )

}

export default EditAvatarPopup;
