import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitState {
  isHydrated: boolean;
}

const initialState: InitState = {
  isHydrated: false,
};

const initSlice = createSlice({
  name: 'init',
  initialState,
  reducers: {
    setHydrated: (state, action: PayloadAction<boolean>) => {
      state.isHydrated = action.payload;
    },
  },
});

export const { setHydrated } = initSlice.actions;
export type { InitState };
export default initSlice.reducer;
