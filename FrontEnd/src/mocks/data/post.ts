import { BoardTypes } from '../../types/board';
import { Post } from '../../types/post';
import { userData } from './user';

export const postData: Post[] = [
  {
    _id: '1234',
    title: '테스트 포스트',
    author: userData[0],
    board: BoardTypes.free,
    content: '<p>안녕하세요</p>',
    likes: [],
    reports: [],
    views: 0,
    images: [],
    updatedAt: '2023-05-30 15:17:01',
    createdAt: '2023-05-30 15:17:01',
    comments: [],
  },
  {
    _id: '12346',
    title: '테스트 포스트',
    author: userData[1],
    board: BoardTypes.free,
    content: '<p>안녕하세요</p>',
    likes: [],
    reports: [],

    images: [],
    views: 0,
    updatedAt: '2023-03-21',

    createdAt: '2023-05-30 15:17:01',
    comments: [],
  },
  {
    _id: '75648',
    title: '테스트 포스트',
    author: userData[2],
    board: BoardTypes.free,
    content: '<p>안녕하세요</p>',
    likes: [],
    reports: [],

    images: [],
    views: 0,
    updatedAt: '2023-03-21',

    createdAt: '2023-05-30 15:17:01',
    comments: [],
  },
  {
    _id: '373685',
    title: '테스트 포스트',
    author: userData[1],
    board: BoardTypes.free,
    content: '<p>안녕하세요</p>',
    likes: [],
    reports: [],

    images: [],
    views: 0,
    updatedAt: '2023-03-21',

    createdAt: '2023-05-30 15:17:01',
    comments: [],
  },
  {
    _id: '7543567',
    title: '테스트 포스트',
    author: userData[1],
    board: BoardTypes.free,
    content: '<p>안녕하세요</p>',
    likes: [],
    reports: [],

    images: [],
    views: 0,
    updatedAt: '2023-03-21',

    createdAt: '2023-05-30 15:17:01',
    comments: [],
  },
  {
    _id: '624526',
    title: '테스트 포스트',
    author: userData[1],
    board: BoardTypes.free,
    content: '<p>안녕하세요</p>',
    likes: [],
    reports: [],

    images: [],
    views: 0,
    updatedAt: '2023-03-21',

    createdAt: '2023-05-30 15:17:01',
    comments: [],
  },
  {
    _id: '52432',
    title: '테스트 포스트',
    author: userData[1],
    board: BoardTypes.free,
    content: '<p>안녕하세요</p>',
    likes: [],
    reports: [],

    images: [],
    views: 0,
    updatedAt: '2023-03-21',

    createdAt: '2023-05-30 15:17:01',
    comments: [],
  },
];
