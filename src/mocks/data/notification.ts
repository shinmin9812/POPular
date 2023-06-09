import { BoardTypes } from '../../types/board';
import { Notification, NotificationType } from '../../types/notification';
import { storeData } from './stores';

export const notificationData: Notification[] = [
  {
    type: NotificationType.Follow,
    content: {
      _id: '134242',
      nickname: '체셔',
      introduce: '안녕하세요',
      allow_notification: true,
    },
    checked: false,
  },
  {
    type: NotificationType.Comment,
    content: {
      id: '134242',
      author: {
        id: '421124',
        nickname: '모자장수',
        introduce: '안녕하세요',
        allow_notification: true,
      },
      content: '댓글입니다~',
      post: '포스트 제목',
      board: BoardTypes.free,
    },
    checked: false,
  },
  {
    type: NotificationType.ad,
    content: storeData[0],
    checked: false,
  },
];
