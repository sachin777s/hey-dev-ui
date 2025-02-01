import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: false,
  data: {},
};

const userSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    fetchUserStart: (state) => {
      state.isLoading = true;
    },

    fetchUserSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },

    fetchUserFailed: (state) => {
      state.error = true;
      state.isLoading = false;
    },
  },
});

export const { fetchUserStart, fetchUserSuccess, fetchUserFailed } =
  userSlice.actions;
export default userSlice.reducer;
