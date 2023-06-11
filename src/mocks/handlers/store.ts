import { rest } from 'msw';
import { storeData } from '../data/stores';
import { API_PATH } from '../../constants/path';

export const store = [
  // 모든 스토어 조회
  rest.get(API_PATH.STORE.GET.ALL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(storeData));
  }),

  // 특정 옵션 스토어 조회
  rest.get(API_PATH.STORE.GET.WITH_OPTIONS, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(storeData));
  }),

  // ID 조회
  rest.get(API_PATH.STORE.GET.BY_ID, (req, res, ctx) => {
    const { storeId } = req.params;
    const result = storeData.find(({ _id }) => _id === storeId);

    if (Number.isNaN(storeId) || !result) {
      return res(
        ctx.status(404),
        ctx.json({
          message: '존재하지 않는 스토어 ID입니다.',
        }),
      );
    }

    return res(ctx.status(200), ctx.json(result));
  }),

  // 마감 임박 스토어 조회
  rest.get(API_PATH.STORE.GET.LAST_MINUTE, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(storeData));
  }),

  // 최신 스토어 조회
  rest.get(API_PATH.STORE.GET.RECENT, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(storeData));
  }),

  // 추천 스토어 조회
  rest.get(API_PATH.STORE.GET.RECOMMENDED, (req, res, ctx) => {
    const result = storeData.slice(0, 3);
    return res(ctx.status(200), ctx.json(result));
  }),

  // 예약 필수 스토어 조회
  rest.get(API_PATH.STORE.GET.RESERVATOIN_REQUIRED, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(storeData));
  }),

  // 주간 스토어 조회
  rest.get(API_PATH.STORE.GET.WEEKLY, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(storeData));
  }),
];
