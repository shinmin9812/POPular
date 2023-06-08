import { Post } from './post';

export interface Comment {
  _id: string;
  author: string;
  content: string;
  parent: {
    type: Post | Comment;
  };
  recomments?: Comment[];
}
