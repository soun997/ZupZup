import { THEME } from 'utils';

const setTheme = (theme: string) => {
  document.cookie = `${THEME.KEY}=${theme}; max-age=604800; path=/; secure; samesite=none`;
};

export { setTheme };
