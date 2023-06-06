import { BoardTypes } from '../../types/board';
import { Comment } from '../../types/comment';
import { userData } from './user';

export const commentData: Comment[] = [
  {
    id: '3213',
    author: {
      id: '134242',
      nickname: '체셔',
      profile: 'https://image.rocketpunch.com/company/20527/elice_logo_1643264201.png?s=400x400&t=inside',
      introduce: '',
      allow_notification: true,
    },
    content: '테스트 댓글',
    parent: {
      type: {
        id: '1234',
        title: '테스트 포스트',
        author: userData[0],
        board: BoardTypes.free,
        content: '<p>안녕하세요</p>',
        likes: [],
        report: [],
        updatedAt: '2023-05-30 15:17:01',
        comments: [],
      },
    },
    recomments: [],
  },
];
