import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createComment, updateComment } from '../../utils/data/commentData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  authorId: 0,
  postId: 0,
  content: '',
};

// CommentForm component
const CommentForm = ({ obj }) => {
  const [currentComment, setCurrentComment] = useState(initialState); // State for storing current comment data
  const currentDate = new Date().toISOString().split('T')[0];
  const router = useRouter(); // Router instance from Next.js
  const { user } = useAuth(); // Accessing authentication context

  useEffect(() => {
    // When the component mounts or the "obj" or "user" changes, update the current comment state
    if (obj.id) {
      setCurrentComment({
        id: obj.id,
        authorId: obj.authorId,
        postId: obj.postId,
        comment: obj.content,
        createdOn: obj.createdOn,
      });
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCurrentComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent the form from being submitted
    e.preventDefault();

    // Check if the comment has an ID (existing comment being updated)
    if (obj.id) {
      // Prepare comment data for update
      const commentUpdate = {
        id: currentComment.id,
        authorId: currentComment.authorId,
        postId: currentComment.postId,
        content: currentComment.content,
        createdOn: currentComment.createdOn,
        // rareUserId: user.uid,
      };
      // Update the comment data using the updateComment function
      updateComment(commentUpdate)
        .then(() => router.push(`/comments?postId=${obj.postId}`)); // Redirect to the comments page after the update
    } else {
      // Prepare comment data for creation
      const comment = {
        authorId: currentComment.authorId,
        postId: currentComment.postId,
        content: currentComment.content,
        createdOn: currentDate,
        // rareUserId: user.uid,
      };
      // Create a new comment by sending a POST request to the server using the createComment function
      createComment(comment).then(() => router.push(`/comments?postId=${comment.postId}`)); // Redirect to the comments page after the creation
    }
  };

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

CommentForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    authorId: PropTypes.number,
    postId: PropTypes.number,
    content: PropTypes.string,
    createdOn: PropTypes.string,
  }),
};

CommentForm.defaultProps = {
  obj: initialState,
};

export default CommentForm;
