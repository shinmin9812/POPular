import { Post } from './post';
import { UserOnlyProfile } from './user';

export interface Comment {
  id: string;
  author: UserOnlyProfile;
  content: string;
  parent: {
    type: Post | Comment;
  };
  recomments?: Comment[];
}
