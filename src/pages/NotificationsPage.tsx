import styled from 'styled-components';
import NotificationItem from '../components/Notifications/components/NotificationItem';
import { Notification } from '../types/notification';
import { useState } from 'react';
import { useEffect } from 'react';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetch('/user/id/12341231')
      .then((data) => data.json())
      .then((userData) => {
        setNotifications(userData.notifications || []);
      });
  }, []);

  return (
    <>
      <Title>알림 목록</Title>
      {notifications.map((data: Notification) => (
        <NotificationItem type={data.type} checked={data.checked} content={data.content} />
      ))}
    </>
  );
};

export default NotificationsPage;

const Title = styled.h1`
  width: 350px;
  font-size: var(--font-medium);
  color: var(--color-main);
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 0 20px;
`;
