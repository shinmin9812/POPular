import styled from 'styled-components';
import { Comment } from '../../../types/comment';
import BoardTypeTag from '../../common/Board/BoardTypeTag';

interface Props {
  commentData: Comment;
  board: string;
}
const CommentNotificationItem = ({ commentData, board }: Props) => {
  return (
    <ItemContainer>
      <Message>{commentData.author.nickname}님이 댓글을 작성했습니다.</Message>
      <CommentContainer>
        <BoardTypeTag boardType={board} />
        <CommentContent>{commentData.content}</CommentContent>
      </CommentContainer>
    </ItemContainer>
  );
};

export default CommentNotificationItem;

const ItemContainer = styled.div`
  width: 95%;
  height: 80px;
  padding: 0 20px;
  margin: 8px auto;
  border: 1px solid var(--color-light-gray);

  transition: all 0.3s ease 0s;
  box-shadow: rgb(238, 238, 238) 1px 1px 10px;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Message = styled.p`
  margin: 4px 0;
`;

const CommentContainer = styled.div`
  display: flex;
  margin: 4px 0;
`;

const CommentContent = styled.p`
  margin-left: 10px;
`;
