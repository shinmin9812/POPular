import { Category } from './category';
import { Follow } from './follow';

export const enum RoleTypes {
  USER = 'user',
  ADMIN = 'admin',
  ENTERPRISER = 'enterpriser',
}

export interface User {
  _id: string;
  email: string;
  pw: string;
  name: string;
  nickname: string;
  phone_number: string;
  follower: Follow[];
  following: Follow[];
  profile: string;
  introduce: string;
  role: RoleTypes;
  interested_category: Category[];
  allow_notification: boolean;
  scraps: string[];
  createdAt: string;
  notifications: string[];
}
