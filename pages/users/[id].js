/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleUser, getUserPosts } from '../../utils/data/userData';
import PostCard from '../../components/posts/PostCard';
// import { useAuth } from '../../utils/context/authContext';

export default function ViewUser() {
  const [userDetails, setUserDetails] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  // const { user } = useAuth();

  // const getAllUserPosts = () => {
  //   viewUserDetails(id).then(setUserDetails);
  // };

  useEffect(() => {
    getSingleUser(id).then((data) => {
      setUserDetails(data);
      console.warn(data);
      getUserPosts(data.uid).then((posts) => {
        setUserPosts(posts);
      });
    });
  }, [id]);

  console.warn(userPosts);

  return (
    <div>
      <h1 style={{ marginTop: '75px' }}>User Details</h1>
      <div className="mt-5 d-flex flex-wrap" style={{ marginTop: '100px' }}>
        <div className="d-flex flex-column">
          <img src={userDetails.profile_image_url} alt={userDetails.first_name} style={{ width: '300px', marginRight: ' 100px' }} />
        </div>
        <div className="text-grey ms-5 details">
          <h5>
            {userDetails.first_name} {userDetails.last_name}
          </h5>
          Email: <a href={`mailto:${userDetails.email}`}>{userDetails.email}</a>
          <hr />
          <p>Bio: {userDetails.bio}</p>
        </div>
        <div className="d-flex flex-wrap text-center" style={{ marginTop: '50px' }}>
          {userPosts.map((post) => (
            <section key={`post--${post.id}`} className="post">
              <PostCard id={post.id} title={post.title} imageUrl={post.image_url} rareUserId={post.rare_user_id} />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
