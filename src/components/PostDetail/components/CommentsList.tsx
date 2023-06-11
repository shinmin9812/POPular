import styled from 'styled-components';
import { Comment } from '../../../types/comment';
import CommentItemContainer from '../containers/CommentItemContainer';

const CommentBox = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px var(--color-light-gray) solid;
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
        {comments?.map((comment, index) => (
          <CommentItemContainer key={comment._id + index} comment={comment} />
        ))}
      </ul>
    </CommentBox>
  );
};

export default CommentsList;
