import { Notification, NotificationType } from '../../types/notification';
import { userData } from './user';

export const notificationData: Notification[] = [
  {
    _id: '1234',
    type: NotificationType.Comment,
    content: userData[0],
    checked: false,
  },
];
