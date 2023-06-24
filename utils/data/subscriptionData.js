import { clientCredentials } from '../client';

const createSubscription = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/subscriptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const deleteSubscription = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/subscriptions/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve((data)))
    .catch(reject);
});
const getSingleSubscription = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/subscriptions/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});
const getMySubscriptions = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/subscriptions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const usersPosts = Object.values(data).filter((item) => item.author_id.uid === uid);
      resolve(usersPosts);
    })
    .catch(reject);
});

export {
  createSubscription, deleteSubscription, getSingleSubscription, getMySubscriptions,
};
