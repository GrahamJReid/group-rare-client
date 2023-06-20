import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import { useRouter } from 'next/router';
import PostCard from '../../components/posts/PostCard';
import { getMyPosts } from '../../utils/data/postsData';
import { useAuth } from '../../utils/context/authContext';

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getMyPosts(user.uid).then((data) => setPosts(data));
  }, [user]);

  const displayPosts = () => {
    getMyPosts(user.uid).then((data) => setPosts(data));
  };

  return (
    <>
      <h1>My Posts</h1>
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

export default MyPosts;
