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
      const postArray = [];
      Promise.all(data.map((post) => getMyPosts(post.follower_id.uid)))
        .then((results) => {
          results.forEach((item) => {
            item.forEach((singlePost) => {
              postArray.push(singlePost);
            });
          });
          setPosts(postArray);
        });
    });
  }, [user.uid]);

  return (
    <div
      className="text-center d-flex flex-column"
      style={{
        height: '90vh',
        paddingTop: '100px',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.fbUser.displayName}! </h1>
      <p>Subscriber Posts</p>
      <div />

      <div
        className="homePostsDiv text-center d-flex flex-column"
        style={{
          height: '100vh',
          padding: '40px',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        {posts.map((post) => (
          <section key={`post--${post.id}`} className="post">
            <PostCard id={post.id} title={post.title} imageUrl={post.image_url} rareUserId={post.rare_user_id} />
          </section>
        ))}
      </div>
    </div>
  );
}

export default Home;
