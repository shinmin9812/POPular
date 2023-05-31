import { Board } from './board';

export const enum NotificationTypes {
  follow = '팔로우',
  comment = '댓글',
  ad = '광고',
}

export interface Notification {
  id: string;
  type: NotificationTypes;
  board: Board;
  contentId: any;
  checked: boolean;
  createdAt: string;
}
