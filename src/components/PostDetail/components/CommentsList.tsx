import styled from 'styled-components';
import { Comment } from '../../../types/comment';
import CommentItemContainer from '../containers/CommentItemContainer';

const CommentBox = styled.div`
  margin-top: 30px;
`;

const Title = styled.h4`
  font-size: var(--font-medium);
  margin-bottom: 10px;
  span {
    color: var(--color-red);
  }
`;

const CommentsList = ({ comments }: { comments: Comment[] | undefined }) => {
  return (
    <CommentBox>
      <Title>
        Comment <span>{comments?.length}</span>
      </Title>
      <ul>
        {comments?.map((comment) => (
          <CommentItemContainer comment={comment} />
        ))}
      </ul>
    </CommentBox>
  );
};

export default CommentsList;
