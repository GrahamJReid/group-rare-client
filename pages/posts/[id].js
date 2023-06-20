/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getSinglePost } from '../../utils/data/postsData';

function PostDetails() {
  const [post, setPost] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSinglePost(id).then((data) => setPost(data));
  }, [id]);

  return (
    <>
      <h1> Title: {post.title}</h1>
      <h3>Published: {post.publication_date}</h3>
      <h2>Author: {post.rare_user_id.first_name} {post.rare_user_id.last_name}</h2>
      <h4>Category: {post.category_id.label}</h4>
      <img src={post.image_url} />
      <p>{post.content}</p>
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
