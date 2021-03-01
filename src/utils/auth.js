import {AUTH_BASE_URL} from "./constants";

const responseCheck = (response) => response.ok
  ? response.json()
  : Promise.reject(`Ошибка ${response.status}`);

export const register = (email, password) => {
  return fetch(`${AUTH_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then(responseCheck)
};

export const authorize = (email, password) => {
  return fetch(`${AUTH_BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then(responseCheck)
};

export const checkToken = (token) => {
  return fetch(`${AUTH_BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(responseCheck)
}
