/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';

import { Card, Button } from 'react-bootstrap';
import { deletePosts } from '../../utils/data/postsData';
import { useAuth } from '../../utils/context/authContext';

const PostCard = ({
  id,
  title, //
  imageUrl,
  rareUserId,
  onUpdate,
}) => {
  const router = useRouter();
  const { user } = useAuth();

  const deletethisPost = () => {
    if (window.confirm('Delete your Post?')) {
      deletePosts(id).then(() => onUpdate());
    }
  };
  console.warn(rareUserId.uid);
  console.warn(user.uid);
  return (
    <>
      <div>
        <Card className="post-card">
          <Card.Header>Title: {title}</Card.Header>
          <Card.Body>
            <img src={imageUrl} style={{ width: '200px' }} />
          </Card.Body>
          <Card.Footer className="text-white">Author: {rareUserId.first_name}{rareUserId.last_name} </Card.Footer>
          <Button
            className="post-card-button"
            onClick={() => {
              router.push(`/posts/${id}`);
            }}
          >
            Post Details
          </Button>

          {rareUserId.uid === user.uid
            ? (
              <>
                <Button
                  onClick={deletethisPost}
                  className="post-card-button"
                >
                  Delete
                </Button>
                <Button
                  className="post-card-button"
                  onClick={() => {
                    router.push(`/posts/edit/${id}`);
                  }}
                >
                  Edit Post
                </Button>
              </>
            ) : ''}
        </Card>
      </div>
    </>
  );
};

PostCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  rareUserId: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
