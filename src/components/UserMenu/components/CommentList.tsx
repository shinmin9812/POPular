import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Comment } from '../../../types/comment';
import CommentItem from './CommentItem';

const Container = styled.section``;

interface Props {
  comments: Comment[];
}

const CommentList = ({ comments }: Props) => {
  return (
    <Container>
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.id}>
              <Link to={`/posts/${comment.post.id}`}>
                <CommentItem comment={comment} />
              </Link>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export default CommentList;
