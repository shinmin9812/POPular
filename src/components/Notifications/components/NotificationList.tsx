import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import styled from 'styled-components';
import AdNotificationItem from './AdNotificationItem';
import CommentNotificationItem from './CommentNotificationItem';
import FollowNotificationItem from './FollowNotificationItem';
import { Notification } from '../../../types/notification';
import RecommentNotificationItem from './RecommentNotificationItem';
import { Link } from 'react-router-dom';

const NotificationList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const userData = useSelector((state: RootState) => state.UserSlice.user);

  const getUserNotification = async () => {
    if (userData) {
      const res = await fetch(`http://34.22.81.36:3000/notifications/user/${userData._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      setNotifications(data.reverse());
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getUserNotification();
  }, [userData]);

  if (isLoading) {
    return (
      <Loading>
        <img src="/images/loading.gif" alt="loading" width="100px" />
      </Loading>
    );
  }

  if (userData && !userData.allow_notification)
    return (
      <LinkContainer>
        <p>알림 설정을 허용해주세요!</p>
        <StyledLink to={`/usermenu/${userData._id}/update`}>알림 설정하러 가기🔔</StyledLink>
      </LinkContainer>
    );
  if (notifications.length === 0) {
    return <Empty>알림이 없습니다.</Empty>;
  }
  return (
    <NotificationListContainer>
      {notifications &&
        notifications.map((data, idx) => {
          if (data.type === 'follow')
            return (
              <FollowNotificationItem key={idx} id={data._id} follower={data.content_user!} checked={data.checked} />
            );
          else if (data.type === 'comment')
            return (
              <CommentNotificationItem
                key={idx}
                id={data._id}
                commentData={data.content_comment!}
                board={data.board!}
                checked={data.checked}
              />
            );
          else if (data.type === 'recomment')
            return (
              <RecommentNotificationItem
                key={idx}
                id={data._id}
                recommentData={data.content_comment!}
                board={data.board!}
                checked={data.checked}
              />
            );
          else if (data.type === 'ad')
            return (
              <AdNotificationItem key={idx} id={data._id} storeData={data.content_store!} checked={data.checked} />
            );
        })}
    </NotificationListContainer>
  );
};

export default NotificationList;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 20px;
  justify-content: center;
  align-items: center;
  background-color: var(--color-light-gray);
  border-radius: 8px;

  p {
    font-size: var(--font-medium);
  }
`;

const StyledLink = styled(Link)`
  font-size: 25px;
  margin: 20px 0;
  padding: 10px;
  background-color: var(--color-white);
  border-radius: 8px;
  box-shadow: var(--color-light-black) 1px 1px 10px;
`;

const NotificationListContainer = styled.section`
  width: 100%;
  height: 100%;

  animation: appear-post 1s forwards;

  @keyframes appear-post {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Empty = styled.h1`
  font-size: var(--font-medium);
  margin-top: 50px;
  margin: 20px;
  height: 20vh;
  color: var(--color-light-black);
  background-color: var(--color-light-gray);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;
