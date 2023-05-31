import { rest } from 'msw';
import { API_PATH } from '../../constants/path';
import { postData } from '../data/post';

export const post = [
  // 모든 포스트 조회
  rest.get(API_PATH.POST.GET.ALL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(postData));
  }),
  // 특정 유저의 전체 포스트 조회
  rest.get(API_PATH.POST.GET.BY_USER, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(postData));
  }),
  // 특정 유저의 전체 포스트 조회
  rest.get(API_PATH.POST.GET.BY_BOARD, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(postData));
  }),
  // 포스트 ID 조회
  rest.get(API_PATH.POST.GET.BY_ID, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(postData[0]));
  }),
];
