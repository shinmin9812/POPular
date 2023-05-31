import { store } from './store';
import { user } from './user';

export const handlers = [...store, ...user];
