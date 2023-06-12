import { Link } from 'react-router-dom';
import { Comment } from '../../../types/comment';
import CommentItem from './CommentItem';

interface Props {
  comments: Comment[];
}

const CommentList = ({ comments }: Props) => {
  return (
    <ul>
      {comments.map((comment) => {
        return (
          <li key={comment._id}>
            <Link to={`/posts/${comment.parent._id}`}>
              <CommentItem comment={comment} parentType={comment.parent.type} parentId={comment.parent._id} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default CommentList;
