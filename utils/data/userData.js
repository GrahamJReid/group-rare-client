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

const getSingleUser = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const usersInfo = Object.values(data).filter((item) => item.rare_user_id === id);
      resolve(usersInfo);
    })
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
  fetch(`${clientCredentials.databaseURL}/users/${payload.id}.json`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getUserPosts = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts.json?orderBy="id"&equalTo="${id}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'applications.json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const viewMyPosts = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const usersPosts = Object.values(data).filter((item) => item.rare_user_id.uid === uid);
      resolve(usersPosts);
    })
    .catch(reject);
});

const viewUserDetails = (uid) => new Promise((resolve, reject) => {
  Promise.all([getSingleUser(uid), viewMyPosts(uid)])
    .then(([userObject, userPostsArray]) => {
      resolve({ ...userObject, posts: userPostsArray });
    }).catch((error) => reject(error));
});

const viewUserPosts = (uid) => new Promise((resolve, reject) => {
  Promise.all([getSingleUser(uid),
    getUserPosts(uid)])
    .then(([userObject, userPostsArray]) => {
      resolve({ ...userObject, tutorials: userPostsArray });
    }).catch((error) => reject(error));
});

export {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  getUserPosts,
  viewUserDetails,
  viewUserPosts,
  viewMyPosts,
};
