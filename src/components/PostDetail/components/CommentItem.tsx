import styled from 'styled-components';
import { Comment } from '../../../types/comment';
import CommentInput from './CommentInput';
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
  UpdateAt,
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
          <CommentAuthorName>{comment.author.nickname}</CommentAuthorName>
          <CommentContent>{comment.content}</CommentContent>
          <CommentUpdateAt>{UpdateAt}</CommentUpdateAt>
        </CommentWrap>
        <ReComment />
        {/* {ReComment && <ReComment />} */}
      </div>
      {reCommentInput && <CommentInput />}
    </Li>
  );
};

export default CommentItem;
