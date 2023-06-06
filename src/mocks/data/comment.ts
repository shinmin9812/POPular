import { BoardTypes } from '../../types/board';
import { Comment } from '../../types/comment';

export const commentData: Comment[] = [
  {
    id: '3213',
    author: {
      id: '134242',
      nickname: '체셔',
      profile: 'https://image.rocketpunch.com/company/20527/elice_logo_1643264201.png?s=400x400&t=inside',
    },
    content: '테스트 댓글',
    post: {
      id: '1234',
      title: '테스트 포스트',
      author: {
        id: '12341231',
        nickname: '엘리스',
      },
      board: BoardTypes.free,
      content: '<p>안녕하세요</p>',
      likes: 10,
      report: 2,
      updatedAt: '2023-03-21',
    },
  },
];
