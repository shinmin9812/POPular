const API_BASE_URL = 'http://34.22.81.36:3000';

export const API_PATH = {
  STORE: {
    GET: {
      // 모든 스토어 조회
      ALL: `${API_BASE_URL}/stores`,
      // 특정 옵션 스토어 조회 (쿼리스트링 사용)
      WITH_OPTIONS: `${API_BASE_URL}/stores`,
      // ID 조회
      BY_ID: `${API_BASE_URL}/stores/store/:storeId`,
      // 추천 스토어 조회
      RECOMMENDED: `${API_BASE_URL}/stores/recommended`,
      // 주간 스토어 조회
      WEEKLY: `${API_BASE_URL}/stores/weekly`,
      // 최신 스토어 조회
      RECENT: `${API_BASE_URL}/stores/recent`,
      // 마감 임박 스토어 조회
      LAST_MINUTE: `${API_BASE_URL}/stores/recent/last_minute`,
      // 예약 필수 스토어 조회
      RESERVATOIN_REQUIRED: `${API_BASE_URL}/stores/recent/reservation_required`,
      // 좌표 기반 조회
      BY_COORD: `${API_BASE_URL}/stores/coord`,
    },
    POST: `${API_BASE_URL}/stores`,
    PATCH: `${API_BASE_URL}/stores/:storeId`,
    DELETE: `${API_BASE_URL}/stores`,
  },

  USER: {
    GET: {
      ALL: '/user/all',
      BY_ID: '/user/id/:userId',
      BY_NICKNAME: '/user/nickname/:userNickname',
    },
    POST: {
      LOGIN: '/login',
    },
    PUT: {},
    DELETE: {},
  },

  POST: {
    GET: {
      ALL: `${API_BASE_URL}/feeds/`,
      // 포스트 ID 조회
      BY_ID: `${API_BASE_URL}/feeds/:postId`,
      // 특정 유저의 전체 포스트 조회
      BY_USER: '/post/user/:userId',
      // 포스트 게시판 조회
      BY_BOARD: '/post/board/:boardId',
      // 특정 스토어의 후기 조회
      REVIEW_BY_STORE: '/post/review/:storeId',
      // 자유 게시판 스토 조회
      ALL_FREE_FEEDS: `${API_BASE_URL}/feeds/free`,
      // 후기 게시판 스토 조회
      ALL_REVIEW_FEEDS: `${API_BASE_URL}/feeds/review`,
      // 모집 게시판 스토 조회
      ALL_GATHER_FEEDS: `${API_BASE_URL}/feeds/gather`,
    },
    POST: `${API_BASE_URL}/feeds/`,
    PUT:  `${API_BASE_URL}/feeds/:postId`,
    DELETE: `${API_BASE_URL}/feeds/`,
  },

  COMMENT: {
    GET: {
      // 검색 옵션은 쿼리스트링으로 판별 ex) /comment?author=elice
      ALL: `${API_BASE_URL}/comments`,
      // 코멘트 ID 조회
      BY_ID: '/comment/id/:comentId',
      // 특정 유저의 전체 코멘트
      BY_USER: '/comment/user/:userId',
      // 특정 포스트의 전체 코멘트
      BY_POST: '/comment/post/:postId',
    },
    POST:`${API_BASE_URL}/comments`,
    PUT: {},
    DELETE: `${API_BASE_URL}/comments/`,
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
  BOARD_ALL: '/community/board',
  BOARD: '/community/board/:category',
  POST: '/community/post/:postId',
  WRITE: '/community/write',
  PROFILE: '/community/user/:userId',

  STORE_DETAIL: '/store/:storeId',

  LOGIN: '/login',
  SIGNUP: '/signup',

  USER_MENU: '/usermenu',
  USER_RECENT: '/usermenu/recent',
  USER_SCRAP: '/usermenu/scrap',
  USER_POSTS: '/usermenu/posts',
  USER_COMMENTS: '/usermenu/comments',
  USER_NOTIFICATIONS: '/usermenu/notifications',
  USER_UPDATE: '/user/:userId/update',

  ADMIN: '/admin',

  ADMIN_STORE: {
    STATISTICS: '/admin/store/statistics',
    ADD: '/admin/store/add',
    EDIT: '/admin/store/edit',
    DELETE: '/admin/store/delete',
  },

  ADMIN_USER: {
    STATISTICS: '/admin/user/statistics',
    ADD: '/admin/user/add',
    EDIT: '/admin/user/edit',
    DELETE: '/admin/user/delete',
  },

  ADMIN_FEED: {
    STATISTICS: '/admin/feed/statistics',
    EDIT: '/admin/feed/edit',
    DELETE: '/admin/feed/delete',
  },

  ADMIN_NOTIFICATION: {
    SEND: '/admin/notification/send',
    EDIT: '/admin/notification/edit',
  },

  NOT_FOUND: '/not_found',

  WILD_CARD: '*',
};
