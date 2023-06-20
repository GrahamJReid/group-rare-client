import PropTypes from 'prop-types';
import React from 'react';
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

  return (
    <Card className="text-center">
      <Card.Header />
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
