import { BoardTypes } from './board';
import { Comment } from './comment';
import { Store } from './store';
import { User } from './user';

export const enum NotificationTypes {
  follow = '팔로우',
  comment = '댓글',
  ad = '광고',
}

export interface Notification {
  id: string;
  type: NotificationTypes;
  board: BoardTypes;
  content: Comment | Store | User;
  checked: boolean;
  createdAt: string;
}
