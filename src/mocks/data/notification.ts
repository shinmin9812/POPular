import { BoardTypes } from '../../types/board';
import { Notification, NotificationTypes } from '../../types/notification';
import { commentData } from './comment';

export const notificationData: Notification[] = [
  {
    id: '12332',
    type: NotificationTypes.comment,
    board: BoardTypes.free,
    content: commentData[0],
    checked: false,
    createdAt: '2023-05-12',
  },
];
