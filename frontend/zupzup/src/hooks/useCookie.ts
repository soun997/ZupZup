import { THEME } from 'utils';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const getCookie = (key: string) => {
  if (cookies.get(key)) {
    return cookies.get(key);
  } else {
    return null;
  }
};

const setTheme = (theme: string) => {
  document.cookie = `${THEME.KEY}=${theme}; max-age=604800; path=/; secure; samesite=none`;
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

export { getCookie, setTheme, deleteCookie, deleteAllCookies };
