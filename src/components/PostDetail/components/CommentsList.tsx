import styled from 'styled-components';
import { Comment } from '../../../types/comment';
import ReComment from './ReCommentList';

const CommentBox = styled.div`
  margin-top: 30px;
`;

const CommentWrap = styled.div`
  display: flex;
`;

const Title = styled.h4`
  font-size: var(--font-medium);
  margin-bottom: 10px;
  span {
    color: var(--color-red);
  }
`;
export const CommentItem = styled.li`
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
    <CommentBox>
      <Title>
        Comment <span>{comments?.length}</span>
      </Title>
      <ul>
        {comments?.map((comment) => (
          <CommentItem key={comment.id}>
            <CommentWrap>
              <CommentAuthorName>{comment.author.nickname}</CommentAuthorName>
              <CommentContent>{comment.content}</CommentContent>
              <CommentUpdateAt>{formattedDate}</CommentUpdateAt>
            </CommentWrap>
          </CommentItem>
        ))}
        <CommentItem>
          <CommentWrap>
            <CommentAuthorName>이준석</CommentAuthorName>
            <CommentContent>
              5월 15일에 XXX 팝업 스토어 갈 사람 구해요요 dfdfdf dfdfdfdfdfdfdfsdfkjsdlfjk
            </CommentContent>
            <CommentUpdateAt>{formattedDate}</CommentUpdateAt>
          </CommentWrap>
          <ReComment />
        </CommentItem>
        <CommentItem>
          <CommentWrap>
            <CommentAuthorName>이준석</CommentAuthorName>
            <CommentContent>
              5월 15일에 XXX 팝업 스토어 갈 사람 구해요요 dfdfdf dfdfdfdfdfdfdfsdfkjsdlfjk
            </CommentContent>
            <CommentUpdateAt>{formattedDate}</CommentUpdateAt>
          </CommentWrap>
        </CommentItem>
        <CommentItem>
          <CommentWrap>
            <CommentAuthorName>이준석</CommentAuthorName>
            <CommentContent>
              5월 15일에 XXX 팝업 스토어 갈 사람 구해요요 dfdfdf dfdfdfdfdfdfdfsdfkjsdlfjk
            </CommentContent>
            <CommentUpdateAt>{formattedDate}</CommentUpdateAt>
          </CommentWrap>
        </CommentItem>
        <CommentItem>
          <CommentWrap>
            <CommentAuthorName>이준석</CommentAuthorName>
            <CommentContent>
              5월 15일에 XXX 팝업 스토어 갈 사람 구해요요 dfdfdf dfdfdfdfdfdfdfsdfkjsdlfjk
            </CommentContent>
            <CommentUpdateAt>{formattedDate}</CommentUpdateAt>
          </CommentWrap>
        </CommentItem>
      </ul>
    </CommentBox>
  );
};

export default CommentsList;
