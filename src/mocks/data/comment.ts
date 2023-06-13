import { Comment, CommentParentType } from '../../types/comment';
import { postData } from './post';
import { userData } from './user';

export const commentData: Comment[] = [
  {
    _id: '3213',
    author: userData[0],
    content: '테스트 댓글',
    parent: {
      type: CommentParentType.feed,
      id: postData[0]._id,
    },
    recomments: [],
    updatedAt: '2023-06-13',
  },
];
