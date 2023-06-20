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
      <h1>{post.title}</h1>
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
