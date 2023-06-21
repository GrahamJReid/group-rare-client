import { clientCredentials } from '../client';

const createComment = (comment) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleComment = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getAllCommentsByPostId = (postId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments?postId=${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateComment = (comment) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteComment = (comment) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments/${comment}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application.json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createComment, getAllCommentsByPostId, getSingleComment, updateComment, deleteComment,
};
