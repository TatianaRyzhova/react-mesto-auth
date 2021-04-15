import {BASE_URL} from './constants';

class Api {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

  _checkRequestStatus(result) {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Что-то пошло не так: ${result.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then(result => {
        return this._checkRequestStatus(result)
      })
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then(result => {
        return this._checkRequestStatus(result)
      })
  }

  updateUserProfile(name, title) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: name,
        about: title
      })
    })
      .then(result => {
        return this._checkRequestStatus(result)
      })
  }

  postNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(result => {
        return this._checkRequestStatus(result)
      })
  }

  addCardLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then(result => {
        return this._checkRequestStatus(result)
      })
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then(result => {
        return this._checkRequestStatus(result)
      })
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then(result => {
        return this._checkRequestStatus(result);
      })
  }

  updateAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(result => {
        return this._checkRequestStatus(result);
      })
  }
}

export const api = new Api({
  baseUrl: BASE_URL
})


