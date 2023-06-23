import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewUserDetails } from '../../utils/data/userData';
import PostCard from '../../components/posts/PostCard';

export default function ViewUser() {
  const [userDetails, setUserDetails] = useState({});
  const router = useRouter();

  // grab id from url
  const { id } = router.query;

  const getAllUserPosts = () => {
    viewUserDetails(id).then(setUserDetails);
  };

  // make call to API layer to get the data
  useEffect(() => {
    getAllUserPosts();
  }, [id]);

  return (
    <div>
      <div className="mt-5 d-flex flex-wrap" style={{ marginTop: '100px' }}>
        <div className="d-flex flex-column">
          <img src={userDetails.profile_image_url} alt={userDetails.first_name} style={{ width: '300px' }} />
        </div>
        <div className="text-white ms-5 details">
          <h5>
            {userDetails.first_name} {userDetails.last_name}
          </h5>
          Email: <a href={`mailto:${userDetails.email}`}>{userDetails.email}</a>
          <p>{userDetails.bio}</p>
          <hr />
        </div>
      </div>
      <div className="d-flex flex-wrap text-center" style={{ marginTop: '50px' }}>
        {userDetails.posts?.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getAllUserPosts} />
        ))};
      </div>
    </div>
  );
}
