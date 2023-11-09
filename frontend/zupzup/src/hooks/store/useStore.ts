import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { themeSlice } from './themeSlice';
import { authSlice } from './useAuth';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { ploggingSlice } from './usePlogging';

const reducers = combineReducers({
  themeChanger: themeSlice.reducer,
  auth: authSlice.reducer,
  plogging: ploggingSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
