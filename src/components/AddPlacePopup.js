import PopupWithForm from "./PopupWithForm";
import React, {useState} from "react";

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleLinkChange(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onAddPlace({
      name,
      link
    });
    setName('');
    setLink('');
  }

  return (
    <PopupWithForm
      name={'card'}
      title={'Новое место'}
      submitButtonText={props.isLoading ? 'Сохранить...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input type="text" name="name" className="popup__input popup__input_type_card-title" id="card-title-input"
             value={name} onChange={handleNameChange}
             placeholder="Название" minLength={2} maxLength={30} required/>
      <span id="card-title-input-error" className="input-error"/>
      <input type="url" name="link" className="popup__input popup__input_type_card-link" id="card-link-input"
             value={link} onChange={handleLinkChange}
             placeholder="Ссылка на картинку" required/>
      <span id="card-link-input-error" className="input-error"/>
    </PopupWithForm>
  )

}

export default AddPlacePopup;
