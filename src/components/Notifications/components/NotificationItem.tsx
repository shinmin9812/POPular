import styled from 'styled-components';
import UserIconMini from '../../common/Icons/UserIconMini';
import CommentIconMini from '../../common/Icons/CommentIconMini';
import StoreIconMini from '../../common/Icons/StoreIconMini';
import { NotificationType } from '../../../types/notification';
import BoardTypeTag from '../../common/Board/BoardTypeTag';

const NotificationItem = ({ type, content }: { type: NotificationType; content: any; checked: boolean }) => {
  return <ItemContainer></ItemContainer>;
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
