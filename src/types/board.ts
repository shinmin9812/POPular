import { Post } from './post';

export const enum BoardTypes {
  all = 'all',
  review = 'review',
  gether = 'gether',
  free = 'free',
}

export interface Board {
  id: string;
  title: BoardTypes;
  posts: Post[];
}
