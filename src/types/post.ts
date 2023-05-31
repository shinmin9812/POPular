import { BoardTypes } from './board';
import { Comment } from './comment';

export interface Post {
  id: string;
  title: string;
  author: string;
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
