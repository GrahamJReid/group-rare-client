import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import PostCard from '../../components/posts/PostCard';
import { getAllPosts } from '../../utils/data/postsData';

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((data) => setPosts(data));
  }, []);

  const displayPosts = () => {
    getAllPosts().then((data) => setPosts(data));
  };

  return (
    <>
      <h1>All Posts page title</h1>
      {posts.map((post) => (
        <section key={`game--${post.id}`} className="game">
          <PostCard id={post.id} title={post.title} imageUrl={post.image_url} onUpdate={displayPosts} />
        </section>
      ))}
      <Button
        onClick={() => {
          console.warn(posts);
        }}
      >
        say hay
      </Button>
    </>
  );
}

export default AllPosts;
