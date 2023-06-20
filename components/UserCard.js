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

  const deleteUser = () => {
    if (window.confirm('Delete user?')) {
      deleteUser(id).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center" style={{ width: '200px' }}>
      <Card.Img variant="top" src={profile_image_url} alt={first_name} style={{ height: '250px' }} />
      <Card.Header>{first_name} {last_name}</Card.Header>
      <Card.Body style={{ height: '100px' }}>
        <Card.Title style={{ fontSize: '14px' }}>Created: {created_on}</Card.Title>
        <Card.Text style={{ fontSize: '12px' }}>Email:{'\n'}
          {email}
        </Card.Text>
      </Card.Body>
      <div className="d-flex">
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
          onClick={deleteUser}
          style={{
            margin: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '75px',
          }}
        >
          Delete
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
  email: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default UserCard;
