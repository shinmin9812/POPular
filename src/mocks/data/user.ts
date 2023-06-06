import { Category } from '../../types/category';
import { User } from '../../types/user';
import { notificationData } from './notification';

export const userData: User[] = [
  {
    id: '12341231',
    email: 'elice@elice.com',
    pw: '213231',
    nickname: '엘리스',
    scrap: ['321323', '15451'],
    phone_number: '010-0000-1234',
    introduce: '안녕하세요',
    allow_notification: true,
    follower: [
      {
        id: '134242',
        nickname: '체셔',
        profile: 'https://image.rocketpunch.com/company/20527/elice_logo_1643264201.png?s=400x400&t=inside',
        introduce: '안녕하세요',
        allow_notification: true,
      },
    ],
    following: [
      {
        id: '134242',
        nickname: '체셔',
        introduce: '안녕하세요',
        allow_notification: true,
      },
    ],
    is_enterpriser: false,
    profile: 'https://image.rocketpunch.com/company/20527/elice_logo_1643264201.png?s=400x400&t=inside',
    interested_category: [Category.art],
    notifications: notificationData,
  },
  {
    id: '134242',
    email: 'elice231@elice.com',
    pw: '213231',
    nickname: '체셔',
    scrap: ['321323', '15451'],
    phone_number: '010-0000-1234',
    introduce: '안녕하세요',
    allow_notification: true,
    follower: [],
    following: [],
    is_enterpriser: false,
    interested_category: [Category.character],
    notifications: [],
  },
  {
    id: '421124',
    email: 'elice122@elice.com',
    pw: '213231',
    nickname: '모자장수',
    scrap: ['321323', '15451'],
    phone_number: '010-123-1234',
    introduce: '안녕하세요',
    allow_notification: true,
    follower: [],
    following: [],
    is_enterpriser: false,
    interested_category: [Category.clothes],
    notifications: [],
  },
];
