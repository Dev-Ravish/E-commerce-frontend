import { API } from '../../backend';

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const authenticate = (data, next) => {

  if (typeof Window !== 'undefined') {

    localStorage.setItem('jwt', JSON.stringify(data));
  }
  next();
};



export const signout = (next) => {
  if (typeof Window !== 'undefined') {
    localStorage.removeItem('jwt');
  }
  next();

  return fetch(`${API}/signout`, {
    method: 'GET',
  })
    .then((response) => {
      console.log('successfully signout');
    })
    .catch((err) => {
      console.log(err);
    });
};

export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    const data = localStorage.getItem('jwt');
    return JSON.parse(data);
  } else {
    return false;
  }
};
