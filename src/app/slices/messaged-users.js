import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const messagedUsersSlice = createSlice({
  name: "messagedUser",
  initialState,
  reducers: {
    fetchUsers: (state, action) => {
      state.data = [...state.data, ...action.payload];
    },
    addUser: (state, action) => {
      state.data = [action.payload, ...state.data];
    },
    removeUser: (state, action) => {
      state.data = state.data.filter((user) => user._id !== action.payload._id);
    },
  },
});

export const { fetchUsers, removeUser, addUser } = messagedUsersSlice.actions;
export default messagedUsersSlice.reducer;
