import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CLIENT_PATH } from '../../../constants/path';
import NotificationIcon from '../../common/Icons/NotificationIcon';
import { Notification } from '../../../types/notification';
import { useEffect, useState } from 'react';
import callApi from '../../../utils/callApi';
import RedDot from '../../common/Icons/RedDot';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const UserProfile = () => {
  const [notificationExists, setNotificationExists] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');

  const userData = useSelector((state: RootState) => state.UserSlice.user);

  const checkNotification = async (userId: string) => {
    const response = await callApi('GET', `http://34.22.81.36:3000/notifications/user/${userId}`);
    const data: Notification[] = await response.json();
    const newNotification = data.find((item: Notification) => !item.checked);
    if (userData?.allow_notification && newNotification) {
      setNotificationExists(true);
    }
  };

  useEffect(() => {
    if (userData) {
      setProfileImage(userData.profile);
      setNickname(userData.nickname);
      setUserId(userData._id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      checkNotification(userId);
    }
  }, [userId]);

  return (
    <ProfileContainer>
      <Link to={`/community/user/${userId}`}>
        <ImageContainer>
          <img src={profileImage} alt="profileImage" width={40} />
        </ImageContainer>
        <p>{nickname}</p>
      </Link>
      <Link to={CLIENT_PATH.USER_NOTIFICATIONS} style={{ display: 'flex', alignItems: 'center' }}>
        <NotificationIcon />
        <Dot>{notificationExists ? <RedDot /> : null}</Dot>
      </Link>
    </ProfileContainer>
  );
};

export default UserProfile;

const ProfileContainer = styled.div`
  width: 300px;
  padding: 16px 12px 16px 8px;
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
    padding: 0 12px;
  }
`;

const ImageContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 70%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Dot = styled.div`
  margin-bottom: 20px;
`;
