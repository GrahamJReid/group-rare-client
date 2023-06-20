import PropTypes from 'prop-types';
// import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
import { deleteComment } from '../../utils/data/commentData';

const CommentCard = ({
  id,
  // authorId,
  // postId,
  content,
  createdOn,
  onUpdate,
}) => {
  const deleteThisComment = () => {
    if (window.confirm('Delete Comment?')) {
      deleteComment(id).then(() => onUpdate());
    }
  };

  const router = useRouter();

  // const [authorName, setAuthorName] = useState('');

  // // Fetch the author's name based on the authorId
  // useEffect(() => {
  //   // Assuming you have a function to fetch the user data by id, like `fetchUserById`
  //   fetchUserById(authorId)
  //     .then((user) => {
  //       setAuthorName(user.name);
  //     })
  //     .catch((error) => {
  //       // Handle error if user data fetching fails
  //       console.error('Failed to fetch user data:', error);
  //     });
  // }, [authorId]);

  return (
    <Card className="text-center">
      <Card.Header>
        {/* {authorName} */}
        Author of Comment
      </Card.Header>
      <Card.Body>
        <Card.Title>
          {createdOn}
        </Card.Title>
        <Card.Text>
          {content}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button onClick={() => {
          router.push(`/comments/edit/${id}`);
        }}
        >
          Edit Comment
        </Button>
        <Button onClick={deleteThisComment}>
          Delete Comment
        </Button>
      </Card.Footer>
    </Card>
  );
};

CommentCard.propTypes = {
  id: PropTypes.number.isRequired,
  // authorId: PropTypes.number.isRequired,
  // postId: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  createdOn: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CommentCard;
