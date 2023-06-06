import { Category } from './category';
import { Notification } from './notification';

export interface UserOnlyProfile {
  id: string;
  nickname: string;
  profile?: string;
  introduce: string;
  allow_notification: boolean;
}

export interface User extends UserOnlyProfile {
  email: string;
  pw: string;
  scrap: string[];
  phone_number: string;
  follower: UserOnlyProfile[];
  following: UserOnlyProfile[];
  is_enterpriser: boolean;
  interested_category: Category[];
  notifications: Notification[];
}
