import styled from 'styled-components';
import UserIconMini from '../../common/Icons/UserIconMini';
import CommentIconMini from '../../common/Icons/CommentIconMini';
import StoreIconMini from '../../common/Icons/StoreIconMini';
import { Content, NotificationTypes } from '../../../types/notification';
import BoardTypeTag from '../../common/Board/BoardTypeTag';

const NotificationItem = ({
  type,
  checked,
  content,
}: {
  type: NotificationTypes;
  content: Content;
  checked: boolean;
}) => {
  return (
    <ItemContainer>
      {type === 'follow' && 'nickname' in content && (
        <>
          <UserIconMini />
          <Notification>
            <Message>{content.nickname}님이 회원님을 팔로우합니다.</Message>
          </Notification>
        </>
      )}
      {type === 'comment' && 'author' in content && (
        <>
          <CommentIconMini />
          <Notification>
            <Message>{content.author.nickname}님이 댓글을 작성했습니다.</Message>
            <CommentInfo>
              <BoardTypeTag boardType={content.board} />
              <p>{content.post}</p>
            </CommentInfo>
          </Notification>
        </>
      )}
      {type === 'ad' && 'title' in content && (
        <>
          <StoreIconMini />
          <Notification>
            <Message>{content.title} 오픈!</Message>
          </Notification>
        </>
      )}
    </ItemContainer>
  );
};

export default NotificationItem;

const ItemContainer = styled.div`
  width: 310px;
  padding: 20px 0;
  margin: 0 auto;
  display: flex;
  border-bottom: 1px solid var(--color-gray);
  box-sizing: border-box;

  & svg {
    width: 16px;
    height: 16px;
  }
`;

const Notification = styled.div`
  flex-grow: 1;

  & p {
    font-size: var(--font-regular);
  }
`;

const Message = styled.p`
  margin-left: 10px;
`;

const CommentInfo = styled.div`
  margin-top: 10px;
  margin-left: 10px;
  display: flex;

  & p {
    font-size: var(--font-small);
    margin-left: 10px;
    display: flex;
    align-items: center;
  }
`;
