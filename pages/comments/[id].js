/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import CommentCard from '../../components/comment/CommentCard';
import { getAllCommentsByPostId } from '../../utils/data/commentData';
import { getSinglePost } from '../../utils/data/postsData';

export default function PostComments() {
  const [comments, setComments] = useState([]); // State variable to store comments
  const [postTitle, setPostTitle] = useState([]); // state variable to store post title
  const router = useRouter(); // Next.js router object
  const { id } = router.query; // Extracting the value of the "id" query parameter from the URL

  const showComments = () => {
    // Function to fetch and display comments
    getAllCommentsByPostId(id).then((data) => setComments(data));
  };

  const showPostTitle = () => {
    // Function to fetch and display post title
    getSinglePost(id).then((data) => setPostTitle(data));
  };

  useEffect(() => {
    showComments(); // Fetch and display comments when the component mounts
    showPostTitle(); // Fetch and display post title when component mounts
  }, []);

  return (
    <article className="comments">
      <h1 style={{ marginTop: '30px' }}>{postTitle.title}</h1>
      <h2>Comments</h2>
      <Button
        style={{ marginBottom: '30px', backgroundColor: '#003049' }}
        onClick={() => {
        // Navigate to the "/comments/new" page with the "postId" query parameter set to "id"
          router.push({
            pathname: '/comments/new', // specifies the destination pathname or URL path that the router should navigate to
            query: { // defines the query parameters to be included in the URL
            // query parameters are used to pass additional data to the target page
              postId: id, // sets the postId query parameter to the value of the id variable
            },
          });
        }}
      >
        Add a Comment
      </Button>

      {/* Loop through the "comments" array and render each comment */}
      {comments.map((comment) => (
        <section key={`comment--${comment.id}`} className="comment">
          {/* Pass comment data as props to the "CommentCard" component */}
          <CommentCard
            id={comment.id}
            authorId={comment.author_id}
            postId={comment.post_id}
            content={comment.content}
            createdOn={comment.created_on}
            onUpdate={showComments} // Pass the "showComments" function as a prop to handle comment updates
            commenterName={comment.commenter_name}
          />
        </section>
      ))}
    </article>
  );
}
