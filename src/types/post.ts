import { BoardTypes } from './board';
import { Comment } from './comment';
import { User, UserOnlyProfile } from './user';
import { Store } from './store';

export interface Post {
  _id: string;
  title: string;
  author: User;
  board: BoardTypes;
  content: string;
  images?: string[];
  store_id?: Store;
  ratings?: number;
  likes: UserOnlyProfile[];
  report: UserOnlyProfile[];
  updatedAt: string;
  comments: Comment[];
  views: number
}
