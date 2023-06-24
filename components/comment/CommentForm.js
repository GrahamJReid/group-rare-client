import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createComment, updateComment } from '../../utils/data/commentData';
import { useAuth } from '../../utils/context/authContext';

// Define the CommentForm component
const CommentForm = ({ obj, postId }) => {
  // Get the authenticated user from the useAuth hook
  const { user } = useAuth();

  // Set up the currentComment state using the useState hook
  const [currentComment, setCurrentComment] = useState({
    authorId: user.id,
    postId: Number(postId),
  });

  // Get the router object from the useRouter hook
  const router = useRouter();

  // Use the useEffect hook to update the currentComment state when the obj or user changes
  useEffect(() => {
    // Check if obj has an id
    if (obj.id) {
      // Set the currentComment state with the values from obj
      setCurrentComment({
        id: obj.id,
        authorId: obj.author_id,
        postId: obj.post_id,
        content: obj.content,
        createdOn: obj.created_on,
      });
    }
  }, [obj, user]);

  // Define the handleChange function to update the currentComment state
  const handleChange = (e) => {
    const { name, value } = e.target;

    setCurrentComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Define the handleSubmit function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if obj has an id
    if (obj.id) {
      // Prepare comment data for update
      const commentUpdate = {
        id: currentComment.id,
        authorId: currentComment.author_id,
        postId: currentComment.post_id,
        content: currentComment.content,
        createdOn: currentComment.created_on,
      };

      // Call the updateComment function and handle the response
      updateComment(commentUpdate)
        .then(console.warn(obj))
        .then(() => router.push(`/comments/${currentComment.postId}`));
    } else {
      // Call the createComment function and handle the response
      createComment(currentComment)
        .then((comment) => router.push(`/comments/${comment.post_id}`));
    }
  };

  // Render the CommentForm component
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Comment</h2>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control name="content" required value={currentComment.content} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

// Define the prop types for the CommentForm component
CommentForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    author_id: PropTypes.number,
    post_id: PropTypes.number,
    content: PropTypes.string,
    created_on: PropTypes.string,
  }),
  postId: PropTypes.number,
};

// Set default props for the CommentForm component
CommentForm.defaultProps = {
  obj: {},
  postId: 0,
};

// Export the CommentForm component as the default export
export default CommentForm;
