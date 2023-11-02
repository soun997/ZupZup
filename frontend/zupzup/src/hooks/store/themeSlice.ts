import { createSlice } from '@reduxjs/toolkit';

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
  },
});

export const { toDark, toLight } = themeSlice.actions;
export default themeSlice.reducer;
