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
      <h1 style={{ marginTop: '30px' }}>All Posts</h1>
      <div>
        <div>
          <Button
            style={{ marginTop: '20px', marginBottom: '20px', width: '300px' }}
            className="create-post-button"
            onClick={() => {
              router.push('/posts/new');
            }}
          >
            Create Post
          </Button>
        </div>
      </div>
      <div className="post-div">
        {posts.map((post) => (

          <section key={`post--${post.id}`}>
            <PostCard id={post.id} title={post.title} imageUrl={post.image_url} onUpdate={displayPosts} rareUserId={post.rare_user_id} />
          </section>

        ))}
      </div>
    </>
  );
}

export default AllPosts;
