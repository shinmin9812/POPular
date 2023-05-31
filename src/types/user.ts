import { Brand } from './brand';

export interface User {
  id: string;
  email: string;
  pw: string;
  nickname: string;
  scrap: string[];
  phoneNumber: string;
  follower: string[];
  following: string[];
  isEnterpriser: boolean;
  brand: Brand;
  allowNotification: boolean;
  notifications: [];
}
