import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { notificationData } from '../../../mocks/data/notification';
import AdNotificationItem from './AdNotificationItem';
import CommentNotificationItem from './CommentNotificationItem';
import FollowNotificationItem from './FollowNotificationItem';
import { Notification } from '../../../types/notification';
import RecommentNotificationItem from './RecommentNotificationItem';

const NotificationList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const getUserNotification = async () => {
    const res = await fetch('http://34.22.81.36:3000/notifications/user/648490f8dde175dd0d146256', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await res.json();
    console.log(data);
    setNotifications(data);
  };
  useEffect(() => {
    getUserNotification();
    // setNotifications(notificationData);
  }, []);
  return (
    <NotificationListContainer>
      {notifications.map((data) => {
        if (data.type === 'follow')
          return <FollowNotificationItem follower={data.content_user} checked={data.checked} />;
        else if (data.type === 'comment')
          return (
            <CommentNotificationItem commentData={data.content_comment} board={data.board} checked={data.checked} />
          );
        else if (data.type === 'recomment')
          return (
            <RecommentNotificationItem recommentData={data.content_comment} board={data.board} checked={data.checked} />
          );
        else if (data.type === 'ad')
          return <AdNotificationItem storeData={data.content_store} checked={data.checked} />;
      })}
    </NotificationListContainer>
  );
};

export default NotificationList;

const NotificationListContainer = styled.section`
  width: 100%;
  height: 100vh;
  // border: 1px solid tomato;
`;
