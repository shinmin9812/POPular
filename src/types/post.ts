import { BoardTypes } from './board';
import { Comment } from './comment';
import { User } from './user';

export interface Post {
  _id: string;
  title: string;
  author: User;
  board: BoardTypes;
  content: string;
  images?: string[];
  store_id?: string;
  rating?: number;
  likes: string[];
  report: string[];
  updatedAt: string;
  comments: Comment[];
}
