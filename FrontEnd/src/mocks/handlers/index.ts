import { comment } from './comment';
import { notification } from './notification';
import { post } from './post';
import { store } from './store';
import { user } from './user';

export const handlers = [...store, ...user, ...post, ...comment, ...comment, ...notification];
