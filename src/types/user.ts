import { Brand } from './brand';
import { Notification } from './notification';

export interface UserOnlyProfile {
  id: string;
  nickname: string;
  profile?: string;
}

export interface User extends UserOnlyProfile {
  email: string;
  pw: string;
  scrap: string[];
  phoneNumber: string;
  follower: UserOnlyProfile[];
  following: UserOnlyProfile[];
  isEnterpriser: boolean;
  brand: Brand;
  allowNotification: boolean;
  notifications: Notification[];
}
