import { rest } from 'msw';
import { userData } from '../data/user';
import { API_PATH } from '../../constants/path';

export const user = [
  rest.post('/users/checknickname', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        isExists: false,
      }),
    );
  }),

  rest.post('/users/checkemail', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        isExists: false,
      }),
    );
  }),

  rest.post(API_PATH.USER.POST.LOGIN, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        token: '12345678',
      }),
    );
  }),
  // 모든 유저 조회
  rest.get(API_PATH.USER.GET.ALL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userData));
  }),

  // 특정 ID 유저 조회
  rest.get(API_PATH.USER.GET.BY_ID, (req, res, ctx) => {
    const { userId } = req.params;
    const result = userData.find(({ _id }) => _id === userId);

    if (Number.isNaN(userId) || !result) {
      return res(
        ctx.status(404),
        ctx.json({
          message: '존재하지 않는 유저 ID입니다.',
        }),
      );
    }
    return res(ctx.status(200), ctx.json(result));
  }),

  // 특정 닉네임 유저 조회
  rest.get(API_PATH.USER.GET.BY_NICKNAME, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userData[0]));
  }),
];
