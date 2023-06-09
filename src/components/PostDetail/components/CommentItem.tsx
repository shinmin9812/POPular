import styled from 'styled-components';
import { Comment } from '../../../types/comment';
import CommentInputContainer from '../containers/CommentInputContainer';
import ReComment from './ReCommentList';

const CommentWrap = styled.div`
  display: flex;
`;

export const Li = styled.li`
  display: flex;
  flex-direction: column;
  border-bottom: 1px var(--color-light-gray) solid;
  margin-bottom: 10px;
  padding: 15px 0 15px 15px;
`;

export const CommentAuthorName = styled.span`
  color: var(--color-gray);
  font-weight: var(--weight-light);
  width: 15%;
  font-size: var(--font-small);
`;

export const CommentContent = styled.div`
  margin: 0 10px;
  width: 55%;
  text-align: left;
  font-size: var(--font-small);
`;

export const CommentUpdateAt = styled.span`
  color: var(--color-gray);
  font-weight: var(--weight-light);
  width: 30%;
  font-size: var(--font-small);
`;

const CommentItem = ({
  comment,
  reCommentInput,
  setReCommentInput,
}: //  ReComment
{
  comment: Comment;
  UpdateAt: string;
  reCommentInput: boolean;
  setReCommentInput: () => void;
}) => {
  return (
    <Li>
      <div onClick={setReCommentInput}>
        <CommentWrap>
          {/* <CommentAuthorName>{comment.author.nickname}</CommentAuthorName>
          <CommentContent>{comment.content}</CommentContent>
          <CommentUpdateAt>{UpdateAt}</CommentUpdateAt> */}
          API 연결 필요
        </CommentWrap>
      </div>
      {reCommentInput && <CommentInputContainer commentId={'6482e9eba2a8bb6725d8ae49'} />}
    </Li>
  );
};

export default CommentItem;
