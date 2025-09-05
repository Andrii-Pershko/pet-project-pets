import { configureStore } from '@reduxjs/toolkit';
import petsReducer from './slices/petsSlice';
import userReducer from './slices/userSlice';
import initReducer from './slices/initSlice';
import vaccinationReducer from './slices/vaccinationSlice';

export const store = configureStore({
  reducer: {
    pets: petsReducer,
    user: userReducer,
    init: initReducer,
    vaccination: vaccinationReducer,
  },
});

// Експортуємо типи для store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
