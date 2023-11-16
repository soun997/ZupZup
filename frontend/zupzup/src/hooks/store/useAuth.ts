import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './useStore';

const initAuth = {
  accessToken: null,
  refreshToken: null,
  name: null,
  memberId: null,
  coin: 0,
  birthYear: null,
  gender: 'M',
  height: null,
  weight: null,
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
    setMemberName: (state, action) => {
      state.name = action.payload;
    },
    setMemberId: (state, action) => {
      state.memberId = action.payload;
    },
    deleteAllAuth: state => {
      Object.assign(state, initAuth);
    },
    setCoin: (state, action) => {
      state.coin = action.payload;
    },
    setBirthYear: (state, action) => {
      state.birthYear = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setWeight: (state, action) => {
      state.weight = action.payload;
    },
  },
});

export const {
  setAccessToken,
  setRefreshToken,
  setMemberName,
  setMemberId,
  deleteAllAuth,
  setCoin,
  setBirthYear,
  setGender,
  setHeight,
  setWeight,
} = authSlice.actions;

export const accessToken = (state: RootState) => state.auth.accessToken;
export const refreshToken = (state: RootState) => state.auth.refreshToken;
export const memberId = (state: RootState) => state.auth.memberId;
export const name = (state: RootState) => state.auth.name;
export const coin = (state: RootState) => state.auth.coin;

export default authSlice.reducer;
