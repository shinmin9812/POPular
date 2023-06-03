import { BoardType } from '../post.schema';
import { User } from 'src/users/user.schema';
import { Store } from 'src/stores/store.schema';

export class PostGetDto {
  title: string;
  author: string | User;
  board: BoardType;
  content: string;
  storeId?: string | Store;
  ratings?: number;
  images?: string[];
  likes: string[]; 
  reports: string[]; 
  comments: string[]; 
}
