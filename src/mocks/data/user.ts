import { Category } from '../../types/category';
import { RoleTypes, User } from '../../types/user';

export const userData: User[] = [
  {
    _id: '12341231',
    email: 'elice@elice.com',
    pw: '213231',
    name: '홍길동',
    nickname: '엘리스',
    scraps: ['321323', '15451'],
    phone_number: '010-0000-1234',
    introduce: '안녕하세요',
    role: RoleTypes.USER,
    allow_notification: true,
    follower: [],
    following: [],
    profile: 'https://image.rocketpunch.com/company/20527/elice_logo_1643264201.png?s=400x400&t=inside',
    interested_category: [Category.art],
    notifications: [],
    createdAt: '2023-06-09T09:03:48.455+00:00',
  },
];
