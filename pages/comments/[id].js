import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import CommentCard from '../../components/comment/CommentCard';
import { getAllComments } from '../../utils/data/commentData';

function PostComments({ postId }) {
  const [comments, setComments] = useState([]);
  const router = useRouter();

  const showComments = () => {
    getAllComments().then((data) => setComments(data));
  };
  useEffect(() => {
    showComments();
  }, []);

  // Filter the comments based on the post ID
  const filteredComments = comments.filter(
    (comment) => comment.postId === postId,
  );

  return (
    <article className="comments">
      <h1>Comments</h1>
      <Button onClick={() => {
        router.push('/comments/new');
      }}
      >
        Add a Comment
      </Button>
      {/* converting snake case data to camel case data for client */}
      {filteredComments.map((comment) => (
        <section key={`comment--${comment.id}`} className="comment">
          <CommentCard
            id={comment.id}
            authorId={comment.author_id}
            postId={comment.post_id}
            content={comment.content}
            createdOn={comment.created_on}
            onUpdate={showComments}
          />
        </section>
      ))}
    </article>
  );
}

PostComments.propTypes = {
  postId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default PostComments;
