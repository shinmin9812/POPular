import { Category } from '../../types/category';
import { SNS } from '../../types/sns';
import { Store } from '../../types/store';

export const storeData: Store[] = [
  {
    _id: '123744',
    title: '블루보틀 홍대 팝업 카페',
    description:
      "새로운 계절, 새로운 학기. 새로운 시작을 맞이한 1 대' 커뮤니티에서 블루보틀 팝업 카페를 3월 3일 금 요일부터 만나보세요! 브랜드의 철학과 바리스타의 정성이 깃든 푸어 오 베와 블루보틀에서만 경험할 수 있는 놀라(NOLA) 등의 다양한 음료와 맛있는 디저트를 선보입니다. 오픈 기념으로 준비한 익스클루시브 MD 상품과 인스 타그램 이벤트 소식도 기다려주세요! *홍대 팝업 카페는 현금 없는 매장이며 한정된 기간 동안만 운영합니다. 찾아주시는 손님분들의 너른 양 해 부탁드립니다. (사진 출처: 블루보틀커피코리아 인스타그램)",
    category: Category.food,
    start_date: '2023-03-03',
    end_date: '2023-06-03',
    hours: {
      mon: {
        start: '08:00',
        end: '20:00',
      },
      tue: {
        start: '08:00',
        end: '20:00',
      },
      wed: {
        start: '08:00',
        end: '20:00',
      },
      thu: {
        start: '08:00',
        end: '20:00',
      },
      fri: {
        start: '08:00',
        end: '20:00',
      },
      sat: {
        start: '08:00',
        end: '20:00',
      },
      sun: {
        start: '08:00',
        end: '20:00',
      },
    },
    location: '서울 마포구 서교동 양화로 130 홍대 라이즈호텔 1층',
    postcode: {
      sido: '서울',
      sigungu: '마포구',
    },
    coord: {
      coordinates: [37.553916, 126.920914],
    },
    price: 30000,
    sns: [
      {
        link_type: SNS.insta,
        link_title: '블루보틀 인스타그램',
        link_url: 'https://www.instagram.com/bluebottlekorea/',
      },
    ],
    reservation_required: false,
    images: [
      'https://d1g40zvx7d8icp.cloudfront.net/live/store/1592/meohpRtck',
      'https://d1g40zvx7d8icp.cloudfront.net/live/store/1592/EOPbPqpNg',
      'https://d1g40zvx7d8icp.cloudfront.net/live/store/1592/sjpksoyt',
    ],
    scraps: [],
    createdAt: '2023-06-09T09:03:48.455+00:00',
    updatedAt: '2023-06-09T09:04:48.455+00:00',
  },
  {
    _id: '1234',
    title: '더부스 비어위크',
    description:
      '팬데믹 전 더부스는 5회에 걸쳐 더부스 비어위크 축제를 주최해왔습니다.마스크 착용이 해제된 첫 봄을 맞아 규모를 더 키워 건대 커먼그라운드에서 6일간 총 100종류의 맥주를 선보이는 축제를 준비했습니다. 이번 비어위크에서는 더부스를 비롯하여 펀더멘탈 브루잉, 플레이그라운드, 비어바나 브루어리, 감자아일랜드, 탐라에일 등 전국 각지에서 온 1세대 브루어리부터 신생 브루어리들까지 대거 참여하여 개성 넘치며, 퀄리티 높은 맥주가 서빙될 예정입니다.',
    category: Category.food,
    start_date: '2023-06-01',
    end_date: '2023-06-05',
    hours: {
      mon: {
        start: '10:30',
        end: '22:00',
      },
      tue: {
        start: '10:30',
        end: '22:00',
      },
      wed: {
        start: '10:30',
        end: '22:00',
      },
      thu: {
        start: '10:30',
        end: '22:00',
      },
      fri: {
        start: '10:30',
        end: '22:00',
      },
      sat: {
        start: '10:30',
        end: '22:00',
      },
      sun: {
        start: '10:30',
        end: '22:00',
      },
    },
    location: '서울특별시 광진구 아차산로 200',
    postcode: {
      sido: '서울',
      sigungu: '마포구',
    },
    coord: {
      coordinates: [37.541132, 127.065924],
    },
    price: 7000,
    sns: [
      {
        link_type: SNS.insta,
        link_title: '빔바이올라 스타그램',
        link_url: 'https://www.instagram.com/bimbaylola/',
      },
    ],
    reservation_required: false,
    images: [
      'https://d1g40zvx7d8icp.cloudfront.net/live/store/1597/JAgpwtxAI',
      'https://d1g40zvx7d8icp.cloudfront.net/live/store/1597/EsRfNmfKm',
    ],
    scraps: [],
    createdAt: '2023-06-09T09:03:48.455+00:00',
    updatedAt: '2023-06-09T09:04:48.455+00:00',
  },
  {
    _id: '12345',
    title: '리엘 x 더현대서울',
    description:
      '사랑스러우면서도 모던한 스타일의 여성복 브랜드 리엘의 더현대 팝업스토어 고급스러운 소재와 차별화된 핏감으로 매 시즌 특별 한 룩을 전개합니다.',
    category: Category.clothes,
    start_date: '2023-06-01',
    end_date: '2023-06-07',
    hours: {
      mon: {
        start: '10:30',
        end: '22:00',
      },
      tue: {
        start: '10:30',
        end: '22:00',
      },
      wed: {
        start: '10:30',
        end: '22:00',
      },
      thu: {
        start: '10:30',
        end: '22:00',
      },
      fri: {
        start: '10:30',
        end: '22:00',
      },
      sat: {
        start: '10:30',
        end: '22:00',
      },
      sun: {
        start: '10:30',
        end: '22:00',
      },
    },
    location: '서울 영등포구 여의대로 108 더현대 서울',
    postcode: {
      sido: '서울',
      sigungu: '영등포구',
    },
    coord: {
      coordinates: [37.5260354, 126.928279],
    },
    price: 0,
    sns: [
      {
        link_type: SNS.insta,
        link_title: '리엘 인스타그램',
        link_url: 'https://www.instagram.com/re__l_official/',
      },
      {
        link_type: SNS.website,
        link_title: '리엘 홈페이지',
        link_url: 'https://www.re-l.co.kr/',
      },
    ],
    reservation_required: true,
    images: [
      'https://d1g40zvx7d8icp.cloudfront.net/live/store/2187/kqKQVYFkr',
      'https://d1g40zvx7d8icp.cloudfront.net/live/store/2187/GmladGii',
    ],
    scraps: [],
    createdAt: '2023-06-09T09:03:48.455+00:00',
    updatedAt: '2023-06-09T09:04:48.455+00:00',
  },
  {
    _id: '48564568',
    title: '코닥 코너샵',
    description:
      '사진에 진심인 코닥이 코너샵을 오픈했습니다. 1g 코닥 코너샵(KODAK CORNER SHOP) 팝업에 KODAK의 헤리티지와 프라이빗 포토존을 경험해보세요!.',
    category: Category.art,
    start_date: '2023-05-25',
    end_date: '2023-06-07',
    hours: {
      mon: {
        start: '11:00',
        end: '22:00',
      },
      tue: {
        start: '11:00',
        end: '22:00',
      },
      wed: {
        start: '11:00',
        end: '22:00',
      },
      thu: {
        start: '11:00',
        end: '22:00',
      },
      fri: {
        start: '11:00',
        end: '22:00',
      },
      sat: {
        start: '11:00',
        end: '22:00',
      },
      sun: {
        start: '11:00',
        end: '22:00',
      },
    },
    location: '서울 성동구 연무장길57 1층',
    postcode: {
      sido: '서울',
      sigungu: '성동구',
    },
    coord: {
      coordinates: [37.5424435, 127.055968],
    },
    price: 0,
    sns: [
      {
        link_type: SNS.insta,
        link_title: '코닥 인스타그램',
        link_url: 'https://www.instagram.com/kodakstyle_kr/',
      },
    ],
    reservation_required: false,
    images: [
      'https://d1g40zvx7d8icp.cloudfront.net/live/store/2198/cesXayNlP',
      'https://d1g40zvx7d8icp.cloudfront.net/live/store/2198/zDyooYnI',
      'https://d1g40zvx7d8icp.cloudfront.net/live/store/2198/qtkMDbLmt',
      'https://d1g40zvx7d8icp.cloudfront.net/live/store/2198/HMkUEgkEZ',
    ],
    scraps: [],
    createdAt: '2023-06-09T09:03:48.455+00:00',
    updatedAt: '2023-06-09T09:04:48.455+00:00',
  },
  {
    _id: '1241411',
    title: 'CAKE 전기바이크',
    description:
      '세계에서 가장 혁신적인 전기 바이크 케이크의 팝업 스토어가 갤러리아 백화점에서 운영 중입니다. 케이크는 스웨덴 친환경 전기 바이크 브랜드로 가볍고 조용한 고성능 전기 바이크를 선보입니다',
    category: Category.tech,
    start_date: '2023-05-16',
    end_date: '2023-06-11',
    hours: {
      mon: {
        start: '11:00',
        end: '22:00',
      },
      tue: {
        start: '11:00',
        end: '22:00',
      },
      wed: {
        start: '11:00',
        end: '22:00',
      },
      thu: {
        start: '11:00',
        end: '22:00',
      },
      fri: {
        start: '11:00',
        end: '22:00',
      },
      sat: {
        start: '11:00',
        end: '22:00',
      },
      sun: {
        start: '11:00',
        end: '22:00',
      },
    },
    location: '서울 강남구 압구정로 343 갤러리아 명품관WEST 3층',
    postcode: {
      sido: '서울',
      sigungu: '강남구',
    },
    coord: {
      coordinates: [37.5285474, 127.040029],
    },
    price: 0,
    sns: [
      {
        link_type: SNS.insta,
        link_title: 'cake 인스타그램',
        link_url: 'https://www.instagram.com/ridecake_kr/',
      },
    ],
    reservation_required: true,
    images: [
      'https://d1g40zvx7d8icp.cloudfront.net/live/store/2237/SdewUjkl',
      'https://d1g40zvx7d8icp.cloudfront.net/live/store/2237/gVYtBizIc',
    ],
    scraps: [],
    createdAt: '2023-06-09T09:03:48.455+00:00',
    updatedAt: '2023-06-09T09:04:48.455+00:00',
  },
  {
    _id: '45678',
    title: '스즈메의 문단속',
    description: '누적 관객 수 545만명을 기록한 애니메이션 영화 스즈메 문단속 팝업스토어',
    category: Category.character,
    start_date: '2023-04-26',
    end_date: '2023-06-11',
    hours: {
      mon: {
        start: null,
        end: null,
      },
      tue: {
        start: '11:00',
        end: '22:00',
      },
      wed: {
        start: '11:00',
        end: '22:00',
      },
      thu: {
        start: '11:00',
        end: '22:00',
      },
      fri: {
        start: '11:00',
        end: '22:00',
      },
      sat: {
        start: '11:00',
        end: '22:00',
      },
      sun: {
        start: '11:00',
        end: '22:00',
      },
    },
    location: '서울 서대문구 연세로 13 현대백화점 신촌점',
    postcode: {
      sido: '서울',
      sigungu: '서대문구',
    },
    coord: {
      coordinates: [37.5567461, 126.936556],
    },
    price: 0,
    sns: [
      {
        link_type: SNS.insta,
        link_title: '스즈메의 문단속 인스타그램',
        link_url: 'https://www.instagram.com/suzumenotojimari_official/',
      },
    ],
    reservation_required: true,
    images: [
      'https://d1g40zvx7d8icp.cloudfront.net/live/store/1925/NTOWmEwVj',
      'https://d1g40zvx7d8icp.cloudfront.net/live/store/1925/ketnfnWv',
    ],
    scraps: [],
    createdAt: '2023-06-09T09:03:48.455+00:00',
    updatedAt: '2023-06-09T09:04:48.455+00:00',
  },
  {
    _id: '542326',
    title: 'LG홈브루 X 바프(HBAF)',
    description:
      '삼청동 핫플레이스인 홈브루 플래그십 스토어 홈브루 하우스에서 진행하는 아몬드 브랜드 바프(HBAF)와의 콜라보레이션 팝업 공간',
    category: Category.drink,
    start_date: '2023-06-01',
    end_date: '2023-06-30',
    hours: {
      mon: {
        start: '12:00',
        end: '22:00',
      },
      tue: {
        start: '12:00',
        end: '22:00',
      },
      wed: {
        start: '12:00',
        end: '22:00',
      },
      thu: {
        start: '12:00',
        end: '22:00',
      },
      fri: {
        start: '12:00',
        end: '22:00',
      },
      sat: {
        start: '12:00',
        end: '22:00',
      },
      sun: {
        start: '12:00',
        end: '22:00',
      },
    },
    location: '서울 종로구 북촌로5가길 24 홈브루하우스',
    postcode: {
      sido: '서울',
      sigungu: '종로구',
    },
    coord: {
      coordinates: [37.5805664, 126.981956],
    },
    price: 0,
    sns: [
      {
        link_type: SNS.insta,
        link_title: 'HBAF 인스타그램',
        link_url: 'https://www.instagram.com/hbaf_official/',
      },
    ],
    reservation_required: false,
    images: ['https://d1g40zvx7d8icp.cloudfront.net/live/store/2251/PbLvIIgvi'],
    scraps: [],
    createdAt: '2023-06-09T09:03:48.455+00:00',
    updatedAt: '2023-06-09T09:04:48.455+00:00',
  },
  {
    _id: '487683',
    title: 'APTONE x INAPSQUARE',
    description:
      '다채로운 컬러를 플레이하는 라이프스타일 브랜드 앱톤과 블랙앤화이트를 다양한 방식으로 표현하는 이나피스퀘어가 함께 합니다! 서로 좋아하는 것을 함께 표현한 앱톤 X 이나피스퀘 어 전시를 새로 오픈하는 앱톤 쇼룸에서 만나보세요',
    category: Category.design,
    start_date: '2023-05-19',
    end_date: '2023-06-11',
    hours: {
      mon: {
        start: null,
        end: null,
      },
      tue: {
        start: null,
        end: null,
      },
      wed: {
        start: '12:00',
        end: '22:00',
      },
      thu: {
        start: '12:00',
        end: '22:00',
      },
      fri: {
        start: '12:00',
        end: '22:00',
      },
      sat: {
        start: '12:00',
        end: '22:00',
      },
      sun: {
        start: '12:00',
        end: '22:00',
      },
    },
    location: '서울 성동구 상원6길 7 플랫폼빌딩 1층',
    postcode: {
      sido: '서울',
      sigungu: '성동구',
    },
    coord: {
      coordinates: [37.5487625, 127.048945],
    },
    price: 0,
    sns: [
      {
        link_type: SNS.insta,
        link_title: '이나피스퀘어 인스타그램',
        link_url: 'https://www.instagram.com/inapsquare/',
      },
    ],
    reservation_required: false,
    images: [
      'https://d1g40zvx7d8icp.cloudfront.net/live/store/2114/NvCQZggb',
      'https://d1g40zvx7d8icp.cloudfront.net/live/store/2114/mKBvAkHgr',
      'https://d1g40zvx7d8icp.cloudfront.net/live/store/2114/hgluOhIZ',
    ],
    scraps: [],
    createdAt: '2023-06-09T09:03:48.455+00:00',
    updatedAt: '2023-06-09T09:04:48.455+00:00',
  },
  {
    _id: '76536',
    title: '디아블로4 <영등포시장>',
    description:
      '<당신을 지옥으로 초대합니다.>23년 5월, 근래 발생한 여러 괴이 현상이 공통으로 가리키는 그곳, 영등포시장역의 숨겨진 공간을 조사할 분을 모집합니다.',
    category: Category.other,
    start_date: '2023-05-19',
    end_date: '2023-06-11',
    hours: {
      mon: {
        start: null,
        end: null,
      },
      tue: {
        start: null,
        end: null,
      },
      wed: {
        start: null,
        end: null,
      },
      thu: {
        start: null,
        end: null,
      },
      fri: {
        start: '12:00',
        end: '22:00',
      },
      sat: {
        start: '12:00',
        end: '22:00',
      },
      sun: {
        start: '12:00',
        end: '22:00',
      },
    },
    location: '서울 영등포구 양산로 200 영등포시장역 B2 세븐일레븐 옆 대기실',
    postcode: {
      sido: '서울',
      sigungu: '영등포구',
    },
    coord: {
      coordinates: [37.522721, 126.904945],
    },
    price: 0,
    sns: [
      {
        link_type: SNS.insta,
        link_title: '디아블로 인스타그램',
        link_url: 'https://www.instagram.com/playdiablo/',
      },
    ],
    reservation_required: false,
    images: ['https://d1g40zvx7d8icp.cloudfront.net/live/store/2105/nJGjuVBC'],
    scraps: [],
    createdAt: '2023-06-09T09:03:48.455+00:00',
    updatedAt: '2023-06-09T09:04:48.455+00:00',
  },
  {
    _id: '24566242',
    title: '댄스가수 유랑단 in 더현대 대구',
    description:
      '김완선, 엄정화, 이효리, 보아, 화사와 함께 전국 유랑 을 떠나는 tVN <댄스가수 유랑단>의 팝업 공간 *현장 이미지는 더현대서울 진행 컷으로, 해당 팝업 현장은 이미지와 다를 수 있음',
    category: Category.entertainment,
    start_date: '2023-06-30',
    end_date: '2023-07-06',
    hours: {
      mon: {
        start: null,
        end: null,
      },
      tue: {
        start: null,
        end: null,
      },
      wed: {
        start: null,
        end: null,
      },
      thu: {
        start: null,
        end: null,
      },
      fri: {
        start: '12:00',
        end: '22:00',
      },
      sat: {
        start: '12:00',
        end: '22:00',
      },
      sun: {
        start: '12:00',
        end: '22:00',
      },
    },
    location: '대구 중구 달구벌대로 2077 더현대 대구',
    postcode: {
      sido: '대구',
      sigungu: '중구',
    },
    coord: {
      coordinates: [35.8666358, 128.59063],
    },
    price: 0,
    sns: [
      {
        link_type: SNS.insta,
        link_title: '댄스가수 유랑단 인스타그램',
        link_url: 'https://www.instagram.com/dancingurangdan/',
      },
    ],
    reservation_required: false,
    images: [
      'https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202304/25/newsen/20230425101228885aoos.jpg',
    ],
    scraps: [],
    createdAt: '2023-06-09T09:03:48.455+00:00',
    updatedAt: '2023-06-09T09:04:48.455+00:00',
  },
];
