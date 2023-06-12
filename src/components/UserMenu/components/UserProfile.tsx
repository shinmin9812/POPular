import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CLIENT_PATH } from '../../../constants/path';
import NotificationIcon from '../../common/Icons/NotificationIcon';

const UserProfile = ({
  profileImage,
  nickname,
  userId,
}: {
  profileImage: string;
  nickname: string;
  userId: string;
}) => {
  return (
    <ProfileContainer>
      <Link to={`/user/${userId}`}>
        <img src={profileImage} alt="profileImage" width={40} />
        <p>{nickname}</p>
      </Link>
      <Link to={CLIENT_PATH.USER_NOTIFICATIONS} style={{ display: 'flex', alignItems: 'center' }}>
        <NotificationIcon />
      </Link>
    </ProfileContainer>
  );
};

export default UserProfile;

const ProfileContainer = styled.div`
  width: 350px;
  padding: 4px 12px 16px 8px;
  border-bottom: 1px solid var(--color-gray);
  display: flex;
  justify-content: space-between;

  & > a {
    display: flex;
  }

  & p {
    font-size: var(--font-medium);
    display: flex;
    align-items: center;
    padding: 0 8px;
  }
`;
