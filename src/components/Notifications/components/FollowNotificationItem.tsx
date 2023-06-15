import styled from 'styled-components';
import { User } from '../../../types/user';
import UserIconMini from '../../common/Icons/UserIconMini';

interface Props {
  follower: User;
  checked: boolean;
}
const FollowNotificationItem = ({ follower, checked }: Props) => {
  return (
    <ItemContainer checked={checked}>
      <UserIconMini />
      <Message>{follower.nickname}님이 회원님을 팔로우합니다.</Message>
    </ItemContainer>
  );
};

export default FollowNotificationItem;

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
  align-items: center;
`;

const Message = styled.p`
  margin: 0 10px;
`;
