import { User } from './user';

export const enum CommentParentType {
  feed = 'Feed',
  comment = 'Comment',
}

export interface Comment {
  _id: string;
  author: User;
  content: string;
  parent: {
    type: string;
    id: string;
  };
  updatedAt: string;
  recomments?: Comment[];
}
