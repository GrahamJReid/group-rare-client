/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { deletePosts, getSinglePost } from '../../utils/data/postsData';
import { useAuth } from '../../utils/context/authContext';

function PostDetails() {
  const [post, setPost] = useState({});
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [rareUser, setRareUser] = useState('');
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getSinglePost(id).then((data) => {
      setPost(data);
      setCategory(data.category_id.label);
      const name = `${data.rare_user_id.first_name} ${data.rare_user_id.last_name} `;
      setAuthor(name);
      setRareUser(data.rare_user_id.uid);
    });
  }, [id]);
  console.warn(post);
  const deletethisPost = () => {
    if (window.confirm('Delete your Post?')) {
      deletePosts(id).then(() => router.push('/posts/myPosts'));
    }
  };
  return (
    <>
      <h1> Title: {post.title}</h1>
      <h3>Published: {post.publication_date}</h3>
      <h2>Author: {author}</h2>
      <h4>Category: {category}</h4>
      <img src={post.image_url} />
      <p>{post.content}</p>
      {rareUser === user.uid
        ? (
          <>
            <Button
              onClick={deletethisPost}
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                router.push(`/posts/edit/${id}`);
              }}
            >
              Edit Post
            </Button>
          </>
        ) : ''}
      <Button
        onClick={() => {
          router.push(`/comments/${id}`);
        }}
      >
        comments
      </Button>
    </>
  );
}

export default PostDetails;
