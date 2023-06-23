/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleUser } from '../../utils/data/userData';
import { useAuth } from '../../utils/context/authContext';

export default function ViewUser() {
  const [userDetails, setUserDetails] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  useEffect(() => {
    getSingleUser(id).then(setUserDetails);
  }, [user]);

  return (
    <div>
      <h1 style={{ marginTop: '75px' }}>User Details</h1>
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
    </div>
  );
}
