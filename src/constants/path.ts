export const API_PATH = {
  API_BASE_URL: '/api',
  STORE: {
    GET: {
      // 모든 스토어 조회
      ALL: '/store/all',
      // 특정 옵션 스토어 조회 (쿼리스트링 사용)
      WITH_OPTIONS: '/store',
      // ID 조회
      BY_ID: '/store/id/:storeId',
      // 추천 스토어 조회
      RECOMMENDED: '/store/recommended',
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
      ALL: '/user/all',
      BY_ID: '/user/id/:userId',
      BY_NICKNAME: '/user/nickname/:userNickname',
    },
    POST: {},
    PUT: {},
    DELETE: {},
  },

  POST: {
    GET: {
      ALL: '/post/all',
      // 포스트 ID 조회
      BY_ID: '/post/id/:postId',
      // 특정 유저의 전체 포스트 조회
      BY_USER: '/post/user/:userId',
      // 포스트 게시판 조회
      BY_BOARD: '/post/board/:boardId',
      // 특정 스토어의 후기 조회
      REVIEW_BY_STORE: '/post/store/:storeId',
    },
    POST: {},
    PUT: {},
    DELETE: {},
  },

  COMMENT: {
    GET: {
      // 검색 옵션은 쿼리스트링으로 판별 ex) /comment?author=elice
      ALL: '/comment/all',
      // 코멘트 ID 조회
      BY_ID: '/comment/id/:comentId',
      // 특정 유저의 전체 코멘트
      BY_USER: '/comment/user/:userId',
      // 특정 포스트의 전체 코멘트
      BY_POST: '/comment/post/:postId',
    },
    POST: {},
    PUT: {},
    DELETE: {},
  },

  NOTIFICATION: {
    GET: {
      // 모든 알림 조회
      ALL: '/notification/all',
      // 특정 id 알림 조회
      BY_ID: '/notification/id/:notificationId',
      // 특정 유저의 전체 알림 조회
      BY_USER_ID: '/notification/user/:userId',
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

  BOARD: '/community/board/:category',
  POST: '/community/post/:postId',
  WRITE: '/community/write',

  STORE_DETAIL: '/store/:storeId',

  LOGIN: '/login',
  SIGNUP: '/signup',

  USER_MENU: '/usermenu',
  USER_RECENT: '/usermenu/recent',
  USER_SCRAP: '/usermenu/scrap',
  USER_POSTS: '/usermenu/posts',
  USER_COMMENTS: '/usermenu/comments',
  USER_NOTIFICATIONS: '/usermenu/notifications',

  USER_DETAIL: '/user/:userId',
  USER_UPDATE: '/user/:userId/update',

  NOT_FOUND: '/not_found',

  WILD_CARD: '*',
};
