import { rest } from 'msw';
import { userData } from '../data/user';
import { API_PATH } from '../../constants/path';

export const user = [
  // 모든 유저 조회
  rest.get(API_PATH.USER.GET.ALL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userData));
  }),

  // 작성자 조회
  rest.get(API_PATH.USER.GET.BY_ID, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userData[0]));
  }),

  // 포스트 ID 조회
  rest.get(API_PATH.USER.GET.BY_NICKNAME, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userData[0]));
  }),
];
