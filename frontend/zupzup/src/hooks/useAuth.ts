import { Cookies } from 'react-cookie';
import * as utils from 'utils';

const cookies = new Cookies();

const getCookie = (key: string) => {
  if (cookies.get(key)) {
    return cookies.get(key);
  } else {
    return null;
  }
};

const setAccessToken = (token: string) => {
  document.cookie = `${utils.AUTH.ACCESS_KEY}=${token}; max-age=604800; path=/; secure; samesite=none`;
};

const setRefreshToken = (token: string) => {
  document.cookie = `${utils.AUTH.REFRESH_KEY}=${token}; max-age=604800; path=/; secure; samesite=none`;
};

const setNickname = (nickname: string) => {
  document.cookie = `${utils.AUTH.NICKNAME}=${nickname}; max-age=604800; path=/; secure; samesite=none`;
};

const setMemberId = (id: number) => {
  document.cookie = `${utils.AUTH.MEMBER_ID}=${id}; max-age=604800; path=/; secure; samesite=none`;
};

const deleteCookie = (key: string) => {
  const date = new Date('2020-01-01').toUTCString();
  document.cookie = `${key}=; expires=${date}; path=/;`;
  window.location.reload();
};

const deleteAllCookies = () => {
  const allCookies = cookies.getAll();
  Object.keys(allCookies).forEach((cookieName: string) => {
    const date = new Date('2020-01-01').toUTCString();
    document.cookie = `${cookieName}=; expires=${date}; path=/;`;
  });
  window.location.reload();
};

export {
  getCookie,
  setAccessToken,
  setRefreshToken,
  setNickname,
  setMemberId,
  deleteCookie,
  deleteAllCookies,
};
