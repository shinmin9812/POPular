import { BoardTypes } from './board';
import { Comment } from './comment';
import { User } from './user';
import { Store } from './store';

export interface Post {
  _id: string;
  title: string;
  author: User;
  board: BoardTypes;
  content: string;
  images: string[];
  store_id?: Store;
  ratings?: number;
  likes: string[];
  reports: string[];
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  views: number;
}
