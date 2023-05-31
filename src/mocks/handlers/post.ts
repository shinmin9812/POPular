import { rest } from 'msw';
import { API_PATH } from '../../constants/path';

export const store = [
  // 모든 포스트 조회
  rest.get(API_PATH.POST.GET.ALL, (req, res, ctx) => {
    // return res(ctx.status(200), ctx.json(storeData));
  }),

  // 작성자 조회
  rest.get(API_PATH.POST.GET.BY_AUTHOR, (req, res, ctx) => {
    // return res(ctx.status(200), ctx.json(storeData));
  }),

  // 포스트 ID 조회
  rest.get(API_PATH.POST.GET.BY_ID, (req, res, ctx) => {
    // return res(ctx.status(200), ctx.json(result));
  }),

  // 포스트 제목 조회
  rest.get(API_PATH.POST.GET.BY_TITLE, (req, res, ctx) => {
    // return res(ctx.status(200), ctx.json(storeData));
  }),

  // 스토어 연관 포스트 조회
  rest.get(API_PATH.POST.GET.BY_STORE_ID, (req, res, ctx) => {
    // return res(ctx.status(200), ctx.json(storeData));
  }),
];
