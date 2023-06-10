import styled from 'styled-components';
import { Comment } from '../../../types/comment';
import CommentInputContainer from '../containers/CommentInputContainer';
import UpdateAndDelete from './UpdateAndDeleteButtons';
import ReComment from './ReCommentList';
import XmarkIcon from '../../common/Icons/XmarkIcon';
const CommentWrap = styled.div`
  display: flex;
`;

export const Li = styled.li`
  display: flex;
  flex-direction: column;
  border-bottom: 1px var(--color-light-gray) solid;
  padding: 15px 0 15px 15px;
  line-height: 20px;
  text-align: center;
`;

export const CommentAuthorName = styled.span`
  color: var(--color-gray);
  font-weight: var(--weight-light);
  width: 15%;
  font-size: var(--font-small);
`;

export const CommentContent = styled.div`
  margin: 0 5px;
  width: 55%;
  text-align: left;
  font-size: var(--font-small);
`;

export const CommentUpdateAt = styled.span`
  color: var(--color-gray);
  font-weight: var(--weight-light);
  width: 30%;
  font-size: var(--font-small);
  text-align: right;
`;

export const CommentDeleteButton = styled.button`
  background: none;
  width: 10%;
  padding-top: 2px;
`;

const CommentItem = ({
  comment,
  reCommentInput,
  setReCommentInput,
}: //  ReComment
{
  comment: Comment;
  reCommentInput: boolean;
  setReCommentInput: () => void;
}) => {
  return (
    <Li>
      <CommentWrap onClick={setReCommentInput}>
        <CommentAuthorName>{comment.author.nickname}</CommentAuthorName>
        <CommentContent>{comment.content}</CommentContent>
        <CommentUpdateAt>{comment.updatedAt.slice(0, 10)}</CommentUpdateAt>
        <CommentDeleteButton>
          <XmarkIcon />
        </CommentDeleteButton>
      </CommentWrap>
      {comment.recomments && comment.recomments.length > 0 && <ReComment reComments={comment.recomments} />}
      {reCommentInput && <CommentInputContainer commentId={comment._id} />}
    </Li>
  );
};

export default CommentItem;
