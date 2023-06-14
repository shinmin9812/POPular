import styled from 'styled-components';
import { Comment } from '../../../types/comment';
import BoardTypeTag from '../../common/Board/BoardTypeTag';
import CommentIconMini from '../../common/Icons/CommentIconMini';

interface Props {
  recommentData: Comment;
  board: string;
  checked: boolean;
}

const RecommentNotificationItem = ({ recommentData, board, checked }: Props) => {
  return (
    <ItemContainer checked={checked}>
      <ItemHeader>
        <CommentIconMini />
        <Message>{recommentData.author.nickname}님이 대댓글을 작성했습니다.</Message>
      </ItemHeader>
      <CommentContainer>
        <BoardTypeTag boardType={board} />
        <CommentContent>{recommentData.content}</CommentContent>
      </CommentContainer>
    </ItemContainer>
  );
};

export default RecommentNotificationItem;

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

const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const Message = styled.p`
  margin: 0 10px;
`;

const CommentContainer = styled.div`
  display: flex;
  margin-top: 8px;
  margin-left: 28px;
`;

const CommentContent = styled.p`
  margin-left: 10px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
