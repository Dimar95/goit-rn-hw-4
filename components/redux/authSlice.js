import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  displayName: null,
  stateChange: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      displayName: payload.displayName,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload,
    }),
    authSingOut: () => state,
  },
});
