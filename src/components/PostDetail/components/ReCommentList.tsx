import styled from 'styled-components';
import ReCommentArrowIcon from '../../common/Icons/ReCommentArrowIcon';
import XmarkIcon from '../../common/Icons/XmarkIcon';
import { CommentAuthorName, CommentContent, CommentUpdateAt, CommentDeleteButton } from './CommentItem';
import { Comment } from '../../../types/comment';

const ReCommentWrap = styled.ul`
  background-color: #fafafa;
  border: 1px solid #dddddd;
  margin-top: 10px;
`;

const ReCommentItem = styled.li`
  display: flex;
  padding: 15px 0 15px 15px;
  + li {
    border-top: 1px var(--color-light-gray) solid;
    margin-bottom: 10px;
  }
`;

const ReComment = ({ reComments }: { reComments: Comment[] | undefined }) => {
  return (
    <ReCommentWrap>
      {reComments?.map((reComment, index) => (
        <ReCommentItem key={reComment._id + index}>
          <ReCommentArrowIcon />
          <CommentAuthorName>{reComment.author.nickname}</CommentAuthorName>
          <CommentContent>{reComment.content}</CommentContent>
          <CommentUpdateAt>{reComment.updatedAt.slice(0, 10)}</CommentUpdateAt>
          <CommentDeleteButton>
            <XmarkIcon />
          </CommentDeleteButton>{' '}
        </ReCommentItem>
      ))}
    </ReCommentWrap>
  );
};

export default ReComment;
