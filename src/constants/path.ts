export const API_PATH = {
  API_BASE_URL: '/api',
  STORE: {
    GET: {
      // 모든 스토어 조회
      ALL: '/store/all',
      // 특정 옵션 스토어 조회
      WITH_OPTIONS: '/store',
      // ID 조회
      BY_ID: '/store/:storeId',
      // 추천 스토어 조회
      RECOMENDED: '/store/recomended',
      // 주간 스토어 조회
      WEEKLY: '/store/weekly',
      // 최신 스토어 조회
      RECENT: '/store/recent',
      // 마감 임박 스토어 조회
      LAST_MINUTE: '/store/recent/last_minute',
      // 예약 필수 스토어 조회
      RESERVATOIN_REQUIRED: '/store/recent/reservation_required',
    },
  },
  USER: {},
  POST: {},
  NOTICE: {},
  AUTH: {},
};

export const CLIENT_PATH = {
  HOME: '/',
  MAP: '/map',
  SEARCH: '/search',
  COMMUNITY: '/community',
  USER: '/user',
  USER_DETAIL: '/user/:userId',
  LOGIN: '/login',
  NOT_FOUND: '/not_found',
  WILD_CARD: '*',
};
