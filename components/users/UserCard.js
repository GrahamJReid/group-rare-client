/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

const UserCard = ({
  id,
  first_name,
  last_name,
  profile_image_url,
  created_on,
  email,
  onUpdate,
}) => {
  const router = useRouter();

  // eslint-disable-next-line no-unused-vars
  const deleteUser = () => {
    if (window.confirm('Delete user?')) {
      deleteUser(id).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center" style={{ width: '220px' }}>
      <Card.Img variant="top" src={profile_image_url} alt={first_name} style={{ height: '250px', padding: '25px' }} />
      <Card.Header>{first_name} {last_name}</Card.Header>
      <Card.Body style={{ height: '75px' }}>
        <Card.Title style={{ fontSize: '14px' }}>Created: {created_on}</Card.Title>
        <Card.Text style={{ fontSize: '12px' }}>Email:{'\n'}
          {email}
        </Card.Text>
      </Card.Body>
      <div className="align-items-center d-flex" style={{ margin: '0 auto', marginBottom: '10px' }}>
        <Button
          onClick={() => {
            router.push(`/users/edit/${id}`);
          }}
          style={{
            margin: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '75px',
          }}
        >
          Edit User
        </Button>
        <Button
          onClick={() => {
            router.push(`/users/${id}`);
          }}
          style={{
            margin: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '75px',
          }}
        >
          View
        </Button>
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
  email: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default UserCard;
