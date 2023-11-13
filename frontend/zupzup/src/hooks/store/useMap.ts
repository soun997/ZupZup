import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './useStore';

const initMap = {
  centerLat: null,
  centerLng: null,
};

export const mapSlice = createSlice({
  name: 'map',
  initialState: initMap,
  reducers: {
    setCenterLat: (state, action) => {
      state.centerLat = action.payload;
    },
    setCenterLng: (state, action) => {
      state.centerLng = action.payload;
    },
  },
});

export const { setCenterLat, setCenterLng } = mapSlice.actions;

export const centerLat = (state: RootState) => state.map.centerLat;
export const centerLng = (state: RootState) => state.map.centerLng;

export default mapSlice.reducer;
