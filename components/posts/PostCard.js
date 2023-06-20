/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';

import { Card, Button } from 'react-bootstrap';
import { deletePosts } from '../../utils/data/postsData';

const PostCard = ({
  id,
  title, //
  imageUrl,
  onUpdate,
}) => {
  const router = useRouter();

  const deletethisPost = () => {
    if (window.confirm('Delete your Post?')) {
      deletePosts(id).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <img src={imageUrl} />
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: </Card.Footer>
      <Button
        onClick={() => {
          router.push(`/games/edit/${id}`);
        }}
      >
        Edit Game
      </Button>
      <Button
        onClick={deletethisPost}
      >
        Delete
      </Button>
    </Card>

  );
};

PostCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
