import { createSlice } from '@reduxjs/toolkit';

const initPlogging = {
  startDateTime: null,
  endDateTime: null,
  id: null,
  gatheredTrash: 0,
  coin: 0,
  routeImageUrl: null,
  trashDetail: {
    plastic: 0,
    cigarette: 0,
    can: 0,
    glass: 0,
    paper: 0,
    normal: 0,
    styrofoam: 0,
    metal: 0,
    clothes: 0,
    battery: 0,
    vinyl: 0,
    mixed: 0,
    food: 0,
    etc: 0,
  },
};

export const ploggingSlice = createSlice({
  name: 'plogging',
  initialState: initPlogging,
  reducers: {
    setStartDateTime: (state, action) => {
      state.startDateTime = action.payload;
    },
    setEndDateTime: (state, action) => {
      state.endDateTime = action.payload;
    },
    setPloggingId: (state, action) => {
      state.id = action.payload;
    },
    setGatheredTrash: (state, action) => {
      state.gatheredTrash = action.payload;
    },
    setCoin: (state, action) => {
      state.coin = action.payload;
    },
    setTrashDetail: (state, action) => {
      state.trashDetail = action.payload;
    },
    setRouteImage: (state, action) => {
      state.routeImageUrl = action.payload;
    },
    deleteAllAuth: state => {
      Object.assign(state, initPlogging);
    },
  },
});

export const {
  setStartDateTime,
  setEndDateTime,
  setPloggingId,
  setGatheredTrash,
  setCoin,
  setTrashDetail,
  setRouteImage,
  deleteAllAuth,
} = ploggingSlice.actions;

export default ploggingSlice.reducer;
