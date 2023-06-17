import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth'; // Update with path to registerUser

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    bio: '',
    profile_image_url: '',
    email: '',
    active: true,
    is_staff: true,
    uid: user.uid,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split('T')[0]; // Get the current date
    const updatedFormData = { ...formData, created_on: currentDate };
    registerUser(updatedFormData)
      .then(() => updateUser(user.uid));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>

      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          name="first_name"
          required
          value={formData.first_name}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          name="last_name"
          required
          value={formData.last_name}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBio">
        <Form.Label>User Bio</Form.Label>
        <Form.Control
          as="textarea"
          name="bio"
          required
          placeholder="Enter your Bio"
          value={formData.bio}
          onChange={handleInputChange}
        />
        <Form.Text className="text-muted">Let other users know a little bit about you...</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Profile Image</Form.Label>
        <Form.Control
          name="profile_image_url"
          required
          value={formData.profile_image_url}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
          required
          value={formData.email}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
