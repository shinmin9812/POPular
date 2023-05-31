import { UserOnlyProfile } from './user';

export interface Comment {
  id: string;
  author: UserOnlyProfile;
  content: string;
  post: any;
}
