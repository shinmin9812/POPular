import styled from 'styled-components';
import ReCommentArrowIcon from '../../common/Icons/ReCommentArrowIcon';
import { CommentAuthorName, CommentContent, CommentUpdateAt } from './CommentItem';

const ReCommentWrap = styled.ul`
  background-color: #fafafa;
  border: 1px solid #dddddd;
  margin-top: 20px;
`;

const ReCommentItem = styled.li`
  display: flex;
  padding: 15px 0 15px 15px;
  + li {
    border-top: 1px var(--color-light-gray) solid;
    margin-bottom: 10px;
  }
`;

const ReComment = () => {
  return (
    <ReCommentWrap>
      <ReCommentItem>
        <ReCommentArrowIcon />
        <CommentAuthorName>이준석</CommentAuthorName>
        <CommentContent>5월 15일에 XXX 팝업 스토어 갈 사람 구해요요 dfdfdf dfdfdfdfdfdfdfsdfkjsdlfjk</CommentContent>
        <CommentUpdateAt>06.05 11:48:51</CommentUpdateAt>
      </ReCommentItem>
      <ReCommentItem>
        <ReCommentArrowIcon />
        <CommentAuthorName>이준석</CommentAuthorName>
        <CommentContent>5월 15일에 XXX 팝업 스토어 갈 사람 구해요요 dfdfdf dfdfdfdfdfdfdfsdfkjsdlfjk</CommentContent>
        <CommentUpdateAt>06.05 11:48:51</CommentUpdateAt>
      </ReCommentItem>
    </ReCommentWrap>
  );
};

export default ReComment;
