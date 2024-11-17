// globalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

// Exporter les actions générées automatiquement par le slice
export const { setUserData } = globalSlice.actions;
// Exporter le reducer pour le combiner dans le store
export default globalSlice.reducer;
