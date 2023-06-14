import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { User } from '../../../types/user';
import UserIconMini from '../../common/Icons/UserIconMini';

interface Props {
  id: string;
  follower: User;
  checked: boolean;
}

const handleChecked = async (checked: boolean, id: string) => {
  if (!checked) {
    fetch(`http://34.22.81.36:3000/notifications/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        checked: true,
      }),
    });
  }
};

const FollowNotificationItem = ({ id, follower, checked }: Props) => {
  return (
    <Link to={`/community/user/${follower._id}`} onClick={() => handleChecked(checked, id)}>
      <ItemContainer checked={checked}>
        <UserIconMini />
        <Message>{follower.nickname}님이 회원님을 팔로우합니다.</Message>
      </ItemContainer>
    </Link>
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
  color: ${(props) => props.checked && 'var(--color-light-black)'};
  opacity: ${(props) => (props.checked ? 0.3 : 1)};
`;

const Message = styled.p`
  margin: 0 20px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
