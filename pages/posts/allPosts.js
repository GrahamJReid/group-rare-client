import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import { useRouter } from 'next/router';
import PostCard from '../../components/posts/PostCard';
import { getAllPosts } from '../../utils/data/postsData';

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getAllPosts().then((data) => setPosts(data));
  }, []);

  const displayPosts = () => {
    getAllPosts().then((data) => setPosts(data));
  };

  return (
    <>
      <h1>All Posts page title</h1>
      <div>
        <div>
          <Button
            onClick={() => {
              router.push('/posts/new');
            }}
          >
            Create Post
          </Button>
        </div>
      </div>
      {posts.map((post) => (
        <section key={`post--${post.id}`} className="post">
          <PostCard id={post.id} title={post.title} imageUrl={post.image_url} onUpdate={displayPosts} rareUserId={post.rare_user_id} />
        </section>
      ))}
    </>
  );
}

export default AllPosts;
