import { useRouter } from 'next/router';
import CommentForm from '../../components/comment/CommentForm';

export default function NewEvent() {
  const router = useRouter();
  const { postId } = router.query;

  return (
    <div>
      <h2>Create Comment</h2>
      <CommentForm postId={postId} />
    </div>
  );
}
