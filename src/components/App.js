import React, {useCallback, useEffect, useState} from "react";
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/api";
import {authorize, checkToken, register} from "../utils/auth";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const history = useHistory();
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const tokenCheck = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token)
        .then((result) => {
          if (result) {
            setLoggedIn(true);
            setEmail(result.data.email);
            history.push('/');
          }
        })
        .catch(() => history.push('/sign-in'));
    }
  }, [history])

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck])

  const handleLogin = ({email, password}) => {
    return authorize(email, password)
      .then(result => {
        if (result.token) {
          setLoggedIn(true);
          setEmail(email);
          history.push('/');
          localStorage.setItem('token', result.token);
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setEmail('');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  const handleRegister = ({email, password}) => {
    return register(email, password)
      .then(result => {
        setSuccess(true);
        setInfoTooltipPopupOpen(true);
        history.push('/sign-in');
        return result
      })
      .catch((error) => {
        setInfoTooltipPopupOpen(false);
        console.log(error)
      })
  }

  useEffect(() => {
    api.getUserInfo()
      .then((response) => {
        setCurrentUser(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then((response) => {
        setCards(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const likeRequest = !isLiked ? api.addCardLike(card._id) : api.deleteLike(card._id);
    likeRequest
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((error) => {
        console.log(error)
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((error) => {
        console.log(error)
      })
    ;
  }

  function handleUpdateUser(user) {
    setIsLoading(true);
    api.updateUserProfile(user.name, user.about)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(link) {
    setIsLoading(true);
    api.updateAvatar(link.avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api.postNewCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelectedCard(false);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          email={email}
          onSignOut={handleSignOut}
        />
        <Switch>
          <Route path="/sign-up">
            <Register onRegister={handleRegister}/>
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin}/>
          </Route>
          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />

          <Route>
            {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
          </Route>
        </Switch>
        <Footer/>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name={'confirmation'}
          title={'Вы уверены?'}
          submitButtonText={'Да'}>
        </PopupWithForm>

        <InfoTooltip>
          isOpen={isInfoTooltipPopupOpen}
          success={success}
          onClose={closeAllPopups}
        </InfoTooltip>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
