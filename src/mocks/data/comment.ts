import { Comment } from '../../types/comment';
import { postData } from './post';

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
      type: postData[0],
    },
    recomments: [],
  },
];
