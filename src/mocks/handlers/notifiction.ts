import { rest } from 'msw';
import { API_PATH } from '../../constants/path';
import { notificationData } from '../data/notification';

export const notification = [
  // 모든 알림 조회
  rest.get(API_PATH.NOTIFICATION.GET.ALL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(notificationData));
  }),

  // 특정 유저의 전체 알림 조회
  rest.get(API_PATH.NOTIFICATION.GET.BY_USER_ID, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(notificationData));
  }),

  // 특정 알림 ID 조회
  rest.get(API_PATH.NOTIFICATION.GET.BY_ID, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(notificationData[0]));
  }),
];
