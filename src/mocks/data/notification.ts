import { BoardTypes } from '../../types/board';
import { Notification, NotificationType } from '../../types/notification';
import { userData } from './user';
import { commentData } from './comment';
import { storeData } from './stores';

export const notificationData: Notification[] = [
  {
    _id: '1234',
    type: NotificationType.Comment,
    board: BoardTypes.free,
    user_id: '648490f8dde175dd0d146256',
    content_comment: commentData[0],
    checked: false,
  },
  {
    _id: '1234',
    type: NotificationType.Recomment,
    board: BoardTypes.free,
    user_id: '648490f8dde175dd0d146256',
    content_comment: commentData[0],
    checked: false,
  },
  {
    _id: '1234',
    type: NotificationType.Follow,
    user_id: '648490f8dde175dd0d146256',
    content_user: userData[0],
    checked: false,
  },
  {
    _id: '1234',
    type: NotificationType.Ad,
    user_id: '648490f8dde175dd0d146256',
    content_store: storeData[0],
    checked: false,
  },
];
