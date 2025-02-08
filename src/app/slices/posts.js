import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    loadPosts: (state, action) => {
      state.data = [...state.data, ...action.payload];
    },
    updatePost: (state, action) => {
      const postToUpdate = action.payload;
      state.data = state.data.map((post) => {
        if (postToUpdate._id === post._id) {
          return postToUpdate;
        } else {
          return post;
        }
      });
    },
    removePost: (state, action) => {
      state.data = state.data.filter((post) => post._id !== action.payload._id);
    },

    // Post which is uploaded by current user
    addUploadedPost: (state, action) => {
      state.data = [action.payload, ...state.data];
    },
  },
});

export const { loadPosts, updatePost, removePost, addUploadedPost } = postsSlice.actions;
export default postsSlice.reducer;
