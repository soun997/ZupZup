import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './useStore';
import { THEME } from 'utils';
import { getCookie } from 'hooks';

const isDayTime = () => {
  const day = new Date();
  const hour = day.getHours();

  if (hour >= 6 && hour < 18) {
    return 'light';
  }
  return 'dark';
};

const getInitTheme = () => {
  if (!getCookie(THEME.KEY)) {
    return 'light';
  }
  if (getCookie(THEME.KEY) === THEME.SYSTEM) {
    return isDayTime();
  }
  return getCookie(THEME.KEY);
};

export const themeSlice = createSlice({
  name: 'themeChanger',
  initialState: {
    value: getInitTheme(),
  },
  reducers: {
    toDark: state => {
      state.value = 'dark';
    },
    toLight: state => {
      state.value = 'light';
    },
    toSystem: state => {
      state.value = isDayTime();
    },
  },
});

export const { toDark, toLight, toSystem } = themeSlice.actions;
export const currentTheme = (state: RootState) => state.themeChanger.value;
export default themeSlice.reducer;
