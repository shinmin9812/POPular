import { BoardTypes } from './board';
import { Comment } from './comment';
import { User } from './user';

export interface Post {
  id: string;
  title: string;
  author: User;
  board: BoardTypes;
  content: string;
  images?: string[];
  storeId?: string;
  rating?: number;
  likes: number;
  report: number;
  updatedAt: string;
  comments: Comment[];
}
