import styled from 'styled-components';
import ReCommentArrowIcon from '../../common/Icons/ReCommentArrowIcon';
import XmarkIcon from '../../common/Icons/XmarkIcon';
import { CommentAuthorName, CommentContent, CommentUpdateAt, CommentDeleteButton } from './CommentItem';
import { Comment } from '../../../types/comment';
import getDateFunc from '../../../utils/getDateFunc';
const ReCommentWrap = styled.ul`
  background-color: #fafafa;
  border: 1px solid #dddddd;
  margin-top: 10px;
  width: 86%;
  margin-left: 14%;
`;

const ReCommentItem = styled.li`
  display: flex;
  padding: 15px 0 15px 15px;
  + li {
    border-top: 1px var(--color-light-gray) solid;
  }
`;

const ReComment = ({
  reComments,
  commentDelete,
}: {
  reComments: Comment[] | undefined;
  commentDelete: (commentId: string, authorId: string) => Promise<void>;
}) => {
  return (
    <ReCommentWrap>
      {reComments?.map((reComment, index) => (
        <ReCommentItem key={reComment._id + index}>
          <ReCommentArrowIcon />
          <CommentAuthorName>{reComment.author.nickname}</CommentAuthorName>
          <CommentContent>{reComment.content}</CommentContent>
          <CommentUpdateAt>{getDateFunc(reComment.updatedAt)}</CommentUpdateAt>
          <CommentDeleteButton
            onClick={() => {
              commentDelete(reComment._id, reComment.author._id);
            }}
          >
            <XmarkIcon />
          </CommentDeleteButton>
        </ReCommentItem>
      ))}
    </ReCommentWrap>
  );
};

export default ReComment;
