import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const getUsers = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${uid}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const createUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const updateUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${payload.uid}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const deleteUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${uid}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const favoriteUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const faveUser = Object.values(data).filter((item) => item.favorite);
      resolve(faveUser);
    })
    .catch(reject);
});

const getUserPosts = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'applications.json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  favoriteUser,
  getUserPosts,
};
