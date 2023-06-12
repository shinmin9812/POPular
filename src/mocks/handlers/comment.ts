import { rest } from 'msw';
import { API_PATH } from '../../constants/path';
import { commentData } from '../data/comment';

export const comment = [
  // 모든 코멘트 조회
  rest.get(API_PATH.COMMENT.GET.ALL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(commentData));
  }),

  // 작성자 기반 코멘트 조회
  rest.get(API_PATH.COMMENT.GET.BY_USER, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(commentData));
  }),

  // 코멘트 ID 조회
  rest.get(API_PATH.COMMENT.GET.BY_ID, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(commentData[0]));
  }),

  // 포스트별 코멘트 조회
  rest.get(API_PATH.COMMENT.GET.BY_POST, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(commentData));
  }),
];
