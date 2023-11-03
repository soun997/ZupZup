import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './useStore';

export const themeSlice = createSlice({
  name: 'themeChanger',
  initialState: {
    value: 'light',
  },
  reducers: {
    toDark: state => {
      state.value = 'dark';
    },
    toLight: state => {
      state.value = 'light';
    },
    toSystem: state => {
      state.value =
        new Date().getHours() >= 6 && new Date().getHours() < 18
          ? 'light'
          : 'dark';
    },
  },
});

export const { toDark, toLight, toSystem } = themeSlice.actions;
export const currentTheme = (state: RootState) => state.themeChanger.value;
export default themeSlice.reducer;
