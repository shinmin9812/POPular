import { BoardTypes } from './board';
import { Comment } from './comment';
import { User, UserOnlyProfile } from './user';

export interface Post {
  id: string;
  title: string;
  author: User;
  board: BoardTypes;
  content: string;
  images?: string[];
  storeId?: string;
  rating?: number;
  likes: UserOnlyProfile[];
  report: UserOnlyProfile[];
  updatedAt: string;
  comments: Comment[];
}
