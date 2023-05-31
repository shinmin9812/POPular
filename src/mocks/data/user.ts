import { Brand } from '../../types/brand';
import { User } from '../../types/user';

export const userData: User[] = [
  {
    id: '12341231',
    email: 'elice@elice.com',
    pw: '213231',
    nickname: '엘리스',
    scrap: ['321323', '15451'],
    phoneNumber: '010-0000-1234',
    follower: [
      {
        id: '134242',
        nickname: '체셔',
        profile: 'https://image.rocketpunch.com/company/20527/elice_logo_1643264201.png?s=400x400&t=inside',
      },
    ],
    following: [
      {
        id: '134242',
        nickname: '체셔',
      },
    ],
    isEnterpriser: false,
    profile: 'https://image.rocketpunch.com/company/20527/elice_logo_1643264201.png?s=400x400&t=inside',
    brand: Brand.art,
    allowNotification: false,
    notifications: [],
  },
  {
    id: '134242',
    email: 'elice231@elice.com',
    pw: '213231',
    nickname: '체셔',
    scrap: ['321323', '15451'],
    phoneNumber: '010-0000-1234',
    follower: [],
    following: [],
    isEnterpriser: false,
    brand: Brand.character,
    allowNotification: false,
    notifications: [],
  },
  {
    id: '421124',
    email: 'elice122@elice.com',
    pw: '213231',
    nickname: '모자장수',
    scrap: ['321323', '15451'],
    phoneNumber: '010-123-1234',
    follower: [],
    following: [],
    isEnterpriser: false,
    brand: Brand.clothes,
    allowNotification: false,
    notifications: [],
  },
];
