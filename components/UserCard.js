/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { createSubscription, deleteSubscription, getMySubscriptions } from '../utils/data/subscriptionData';

const UserCard = ({
  id,
  first_name,
  last_name,
  profile_image_url,
  created_on,
  email,
  uid,
}) => {
  const router = useRouter();
  const { user } = useAuth();
  const [counter, setCounter] = useState(0);
  const payload = {
    createdOn: '2023-06-14',
    endedOn: '2023-06-14',
    authorId: `${user.uid}`,
    followId: `${uid}`,
  };
  console.warn(payload);

  useEffect(() => {
    getMySubscriptions(user.uid).then((data) => {
      console.warn(data);
      (data.map((post) => (
        (post.follower_id.uid === uid ? setCounter(1) : ''))));
    });
  }, [id, uid, user.uid]);

  return (
    <Card className="text-center" style={{ width: '220px' }}>
      <Card.Img variant="top" src={profile_image_url} alt={first_name} style={{ height: '250px' }} />
      <Card.Header>{first_name} {last_name}</Card.Header>
      <Card.Body style={{ height: '100px' }}>
        <Card.Title style={{ fontSize: '14px' }}>Created: {created_on}</Card.Title>
        <Card.Text style={{ fontSize: '12px' }}>Email:{'\n'}
          {email}
        </Card.Text>
      </Card.Body>
      <div className="d-flex">
        {/* <Button
          onClick={() => {
            router.push(`/users/edit/${id}`);
          }}
          style={{
            margin: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '75px',
          }}
        >
          Edit User
        </Button> */}
        <Button
          onClick={() => {
            router.push(`/users/${id}`);
          }}
          style={{
            margin: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '90px',
          }}
        >
          View
        </Button>

        {counter === 0
          ? (
            <Button
              style={{
                margin: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '90px',
              }}
              onClick={

                 () => {
                   setCounter(1);
                   createSubscription(payload);
                 }
                }
            >
              Subscribe
            </Button>
          ) : (
            <Button
              style={{
                margin: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '90px',
              }}
              onClick={

             () => {
               getMySubscriptions(user.uid).then((data) => {
                 console.warn(data);
                 (data.map((post) => (
                   (post.follower_id.uid === uid && post.author_id.uid === user.uid ? deleteSubscription(post.id) : ''))));
               });
               setCounter(0);
             }
            }
            >
              UnSubscribe
            </Button>
          )}

      </div>

    </Card>
  );
};

UserCard.propTypes = {
  id: PropTypes.number.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  profile_image_url: PropTypes.string.isRequired,
  created_on: PropTypes.number.isRequired,
  email: PropTypes.number.isRequired,
  uid: PropTypes.string.isRequired,
};

export default UserCard;
