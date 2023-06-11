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
    type: CommentParentType;
    _id: string;
  };
  updatedAt: string;
  recomments?: Comment[];
}
