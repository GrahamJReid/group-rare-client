/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
import { deleteComment, getUserForComments } from '../../utils/data/commentData';
import { useAuth } from '../../utils/context/authContext';

const CommentCard = ({
  id,
  authorId,
  content,
  createdOn,
  onUpdate,
  commenterName,
}) => {
  const deleteThisComment = () => {
    if (window.confirm('Delete Comment?')) {
      deleteComment(id).then(() => onUpdate());
    }
  };

  const router = useRouter();
  const { user } = useAuth();
  const [rareUser, setRareUser] = useState({});

  useEffect(() => {
    getUserForComments(user.uid).then((data) => {
      setRareUser(data[0]);
    });
  }, [user.uid]);

  return (
    <Card className="text-center">
      <Card.Header>
        {commenterName}
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
        {rareUser.id === authorId
          ? (
            <>
              <Button onClick={() => {
                router.push(`/comments/edit/${id}`);
              }}
              >
                Edit Comment
              </Button>
              <Button onClick={deleteThisComment}>
                Delete Comment
              </Button>
            </>
          ) : ''}
      </Card.Footer>
    </Card>
  );
};

CommentCard.propTypes = {
  id: PropTypes.number.isRequired,
  authorId: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  createdOn: PropTypes.string.isRequired,
  commenterName: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CommentCard;
