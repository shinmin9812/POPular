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
      // 좌표 기반 조회 (쿼리스트링 사용)
      BY_COORD: '/store/coord',
      // 브랜드 기반 조회
      BY_BRAND: '/store/:brand',
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
    POST: {},
    PUT: {},
    DELETE: {},
  },

  USER: {
    GET: {
      // 기업인 판별의 경우 쿼리스트링으로 판별
      ALL: '/user/all',
      BY_ID: '/user/:userId',
      BY_NICKNAME: '/user/:nickname',
    },
    POST: {},
    PUT: {},
    DELETE: {},
  },

  POST: {
    GET: {
      // 쿼리스트링으로 게시판 판별, 미존재 시 전체 게시판에서 탐색
      ALL: '/post/all',
      BY_ID: '/post/:postId',
      BY_TITLE: '/post/:postTitle',
      BY_AUTHOR: '/post/:postAuthor',
      BY_STORE_ID: '/post/:storeId',
    },
    POST: {},
    PUT: {},
    DELETE: {},
  },

  COMMENT: {
    GET: {
      ALL: '/comment/all',
      BY_ID: '/comment/:commentId',
      BY_AUTHOR: '/comment/:commentAuthor',
      BY_POST_ID: '/comment/:postId',
    },
    POST: {},
    PUT: {},
    DELETE: {},
  },

  NOTIFICATION: {
    GET: {
      ALL: '/notification/all',
      BY_ID: '/notification/:notificationId',
      BY_USER_ID: '/notification/:userId',
      BY_BOARD: '/notification/:userId/:board',
      BY_STORE_ID: '/notification/:storeId',
    },
    POST: {},
    PUT: {},
    DELETE: {},
  },

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
