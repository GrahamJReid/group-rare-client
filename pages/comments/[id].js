/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import CommentCard from '../../components/comment/CommentCard';
import { getAllCommentsByPostId } from '../../utils/data/commentData';

function PostComments() {
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const showComments = () => {
    getAllCommentsByPostId(id).then((data) => setComments(data));
  };
  useEffect(() => {
    showComments();
  }, []);

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
      {comments.map((comment) => (
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

export default PostComments;
