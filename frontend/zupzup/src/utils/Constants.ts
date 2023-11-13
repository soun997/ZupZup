export const URL = {
  ONBORDING: {
    WORKING: '/working',
    CHARACTER: '/info/character',
    EXPLAIN: '/onboard',
  },
  OPINION: '/opinion',
  LOGIN: {
    HOME: '/login',
    SUCCESS: '/login-success',
    REGIST_INFO: {
      PHYSICAL: '/regist-info/physical',
      PROFILE: '/regist-info/profile',
    },
  },
  MAIN: {
    HOME: '/',
  },
  CALENDAR: {
    CALENDAR: '/calendar',
  },
  PLOGGING: {
    LOBBY: '/plogging/lobby',
    ON: '/plogging/on',
    CAMERA: '/plogging/camera',
    REPORT: '/plogging/report',
    TRASH: '/plogging/trash-report',
  },
  LOADING: 'loading',
  RESULT: {
    REGIST: '/success-regist',
    OPINION: '/success-opinion',
  },
  MYPAGE: {
    HOME: '/mypage',
    REPORT: '/mypage/report',
    SHOP: '/shop',
    SHOP_DETAIL: '/shop/detail',
    PURCHASE: '/success-purchase',
  },
  SETTING: {
    HOME: '/setting',
    PROFILE: '/setting/profile',
    THEME: '/setting/theme',
  },
  TRASH: {
    HOME: '/trash',
  },
};

export const MAX_WIDTH = '768px';
export const SOCIAL_KEY = {
  KAKAO: 'kakao',
  NAVER: 'naver',
  GOOGLE: 'google',
};
export const GENDER = {
  MALE: '남성',
  FEMALE: '여성',
};
export const LOCATIONS_KEY = 'locations';

export const IMAGE_MIME_TYPE = 'image/jpeg';

export const AUTH = {
  ACCESS_KEY: 'Authorization',
  REFRESH_KEY: 'refresh-token',
  MEMBER_ID: 'member-id',
  NICKNAME: 'nickname',
};

export const THEME = {
  KEY: 'theme',
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

export const COORDINATE = {
  LOCATIONS_KEY: 'locations',
  MAX_LATITUDE: 'maxLatitude',
  MIN_LATITUDE: 'minLatitude',
  MAX_LONGITUDE: 'maxLongitude',
  MIN_LONGITUDE: 'minLongitude',
};

export const PLOGGING_COIN_INFO = [
  {
    name: '플라스틱',
    detail:
      'Plastic bag & wrapper , Bottle cap, Other plastic, Straw, Plastic container, Plastic utensils',
    decomposeTime: '10 ~ 20년',
    coin: 50,
    count: 0,
  },
  { name: '담배', detail: 'Cigarette', decomposeTime: '1~5년', coin: 20 },
  { name: '캔', detail: 'Can, Aerosol', decomposeTime: '50 년', coin: 50 },
  {
    name: '유리',
    detail: 'Bottle, Glass jar, Broken glass',
    decomposeTime: '100만년',
    coin: 200,
  },
  {
    name: '종이',
    detail: 'Paper, Paper bag, Carton',
    decomposeTime: '2 ~ 5개월',
    coin: 15,
  },
  {
    name: '일반 쓰레기',
    detail: 'Unlabeled litter',
    decomposeTime: '우리가 정해야할듯',
    coin: 10,
  },
  {
    name: '스티로폼',
    detail: 'Styrofoam piece',
    decomposeTime: '50 년',
    coin: 50,
  },
  {
    name: '금속',
    detail: 'Aluminium foil, Metal bottle cap',
    decomposeTime: '80 ~ 100년',
    coin: 100,
  },
  {
    name: '옷',
    detail: 'Rope & strings, Shoe',
    decomposeTime: '30 ~ 40년',
    coin: 40,
  },
  { name: '배터리', detail: 'Battery', decomposeTime: '100 년', coin: 100 },
  { name: '비닐', detail: '', decomposeTime: '30 ~ 40년', coin: 40 },
  {
    name: '혼합 쓰레기',
    detail: 'Carded blister pack',
    decomposeTime: '',
    coin: 10,
  },
  {
    name: '음식물 쓰레기',
    detail: 'Food waste(25)',
    decomposeTime: '2 ~ 5개월',
    coin: 10,
  },
  { name: '기타', detail: '', decomposeTime: '', coin: 10 },
];
