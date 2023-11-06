import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './useStore';

const initAuth = {
  accessToken: null,
  refreshToken: null,
  nickname: null,
  memberId: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initAuth,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setNickname: (state, action) => {
      state.nickname = action.payload;
    },
    setMemberId: (state, action) => {
      state.memberId = action.payload;
    },
    deleteAllAuth: state => {
      Object.assign(state, initAuth);
    },
  },
});

export const {
  setAccessToken,
  setRefreshToken,
  setNickname,
  setMemberId,
  deleteAllAuth,
} = authSlice.actions;

export const accessToken = (state: RootState) => state.auth.accessToken;
export const refreshToken = (state: RootState) => state.auth.refreshToken;
export const memberId = (state: RootState) => state.auth.memberId;
export const nickname = (state: RootState) => state.auth.nickname;

export default authSlice.reducer;
