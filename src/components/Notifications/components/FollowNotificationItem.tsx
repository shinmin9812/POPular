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

const RemoveNotification = async (id: string) => {
  fetch(`http://34.22.81.36:3000/notifications/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

const FollowNotificationItem = ({ id, follower, checked }: Props) => {
  return (
    <>
      {follower ? (
        <Container checked={checked}>
          <Link to={`/community/user/${follower._id}`} onClick={() => handleChecked(checked, id)}>
            <ItemContainer>
              <UserIconMini />
              <Message>{follower.nickname}님이 회원님을 팔로우합니다.</Message>
            </ItemContainer>
          </Link>
          <RemoveButton onClick={() => RemoveNotification(id)}>×</RemoveButton>
        </Container>
      ) : null}
    </>
  );
};

export default FollowNotificationItem;

const Container = styled.div`
  width: 95%;
  height: 80px;
  margin: 8px auto;
  border: 1px solid var(--color-light-gray);

  transition: all 0.3s ease 0s;
  box-shadow: rgb(238, 238, 238) 1px 1px 10px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: ${(props) => props.checked && 'var(--color-gray)'};

  a {
    color: ${(props) => props.checked && 'var(--color-light-black)'};
    flex: 1;
    height: 100%;
    padding-left: 20px;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const Message = styled.p`
  margin: 0 20px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RemoveButton = styled.span`
  color: var(--color-light-black);
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;

  :hover {
    transition: all 0.1s ease;
    opacity: 1;
    color: var(--color-red);
    transform: scale(1.5);
  }
  transition: all 0.1s ease;
`;
