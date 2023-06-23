import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getMySubscriptions } from '../utils/data/subscriptionData';
import { getMyPosts } from '../utils/data/postsData';
import PostCard from '../components/posts/PostCard';

function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getMySubscriptions(user.uid).then((data) => {
      (data.map((post) => (
        getMyPosts(post.follower_id.uid).then(setPosts)
      )));
    });
  }, [user]);
  console.warn(posts);
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.fbUser.displayName}! </h1>
      <p>Subscriber Posts</p>
      <p>Home page shows posts user subscribes to</p>
      <div />
      {posts.map((post) => (
        <section key={`post--${post.id}`} className="post">
          <PostCard id={post.id} title={post.title} imageUrl={post.image_url} rareUserId={post.rare_user_id} />
        </section>
      ))}
    </div>
  );
}

export default Home;
