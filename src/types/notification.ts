import { Comment } from './comment';
import { Store } from './store';
import { UserOnlyProfile } from './user';

export const enum NotificationTypes {
  follow = 'follow',
  comment = 'comment',
  ad = 'ad',
}

export type Content = UserOnlyProfile | Store | Comment;

export interface Notification {
  type: NotificationTypes;
  content: Content;
  checked: boolean;
}
