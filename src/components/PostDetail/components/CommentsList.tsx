import styled from 'styled-components';
import { Comment } from '../../../types/comment';

const CommentWrap = styled.div`
  margin-top: 30px;
`;

const Title = styled.h4`
  font-size: var(--font-medium);
  margin-bottom: 10px;
  span {
    color: var(--color-red);
  }
`;
const CommentItem = styled.li`
  display: flex;
  border-bottom: 1px var(--color-light-gray) solid;
  margin-bottom: 10px;
  padding: 15px 0 15px 15px;
`;

const CommentAuthorName = styled.span`
  color: var(--color-gray);
  font-weight: var(--weight-light);
  width: 15%;
  font-size: var(--font-small);
`;

const CommentContent = styled.div`
  margin: 0 10px;
  width: 55%;
  text-align: left;
  font-size: var(--font-small);
`;

const CommentUpdateAt = styled.span`
  color: var(--color-gray);
  font-weight: var(--weight-light);
  width: 30%;
  font-size: var(--font-small);
`;
const date = new Date();

const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}.${date
  .getDate()
  .toString()
  .padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date
  .getMinutes()
  .toString()
  .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

const CommentsList = ({ comments }: { comments: Comment[] | undefined }) => {
  return (
    <CommentWrap>
      <Title>
        Comment <span>{comments?.length}</span>
      </Title>
      <ul>
        {comments?.map((comment) => (
          <CommentItem key={comment.id}>
            <CommentAuthorName>{comment.author.nickname}</CommentAuthorName>
            <CommentContent>{comment.content}</CommentContent>
            <CommentUpdateAt>{formattedDate}</CommentUpdateAt>
          </CommentItem>
        ))}
        <CommentItem>
          <CommentAuthorName>이준석</CommentAuthorName>
          <CommentContent>5월 15일에 XXX 팝업 스토어 갈 사람 구해요요 dfdfdf dfdfdfdfdfdfdfsdfkjsdlfjk</CommentContent>
          <CommentUpdateAt>{formattedDate}</CommentUpdateAt>
        </CommentItem>
        <CommentItem>
          <CommentAuthorName>이준석</CommentAuthorName>
          <CommentContent>5월 15일에 XXX 팝업 스토어 갈 사람 구해요요 dfdfdf dfdfdfdfdfdfdfsdfkjsdlfjk</CommentContent>
          <CommentUpdateAt>{formattedDate}</CommentUpdateAt>
        </CommentItem>{' '}
        <CommentItem>
          <CommentAuthorName>이준석</CommentAuthorName>
          <CommentContent>5월 15일에 XXX 팝업 스토어 갈 사람 구해요요 dfdfdf dfdfdfdfdfdfdfsdfkjsdlfjk</CommentContent>
          <CommentUpdateAt>{formattedDate}</CommentUpdateAt>
        </CommentItem>{' '}
        <CommentItem>
          <CommentAuthorName>이준석</CommentAuthorName>
          <CommentContent>5월 15일에 XXX 팝업 스토어 갈 사람 구해요요 dfdfdf dfdfdfdfdfdfdfsdfkjsdlfjk</CommentContent>
          <CommentUpdateAt>{formattedDate}</CommentUpdateAt>
        </CommentItem>
      </ul>
    </CommentWrap>
  );
};

export default CommentsList;
