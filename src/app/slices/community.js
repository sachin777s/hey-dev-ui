import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  posts: {
    data: [],
    currentPage: 1,
    hasMore: true,
  },
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    fetchCommunity: (state, action) => {
      state.data = action.payload;
    },
    deleteCommunity: (state) => {
      state = {
        data: {},
        posts: {
          data: [],
          currentPage: 1,
          hasMore: true,
        },
      };
    },
    fetchCommunityPosts: (state, action) => {
      state.posts.data = [...state.posts.data, ...action.payload];
      if (action.payload.length < 3) {
        state.posts.hasMore = false;
      }
    },
    addUploadedCommunityPost: (state, action) => {
      state.posts.data = [action.payload, ...state.posts.data];
    },
    updateCommunityPost: (state, action) => {
      state.posts.data = state.posts.data.map((post) => {
        if (post._id === action.payload._id) {
          return action.payload;
        } else {
          return post;
        }
      });
    },
    deleteCommunityPost: (state, action) => {
      state.posts.data = state.posts.data.filter(
        (post) => post._id !== action.payload._id
      );
    },
    clearCommunityPosts: (state) => {
      state.posts.data = [];
      state.posts.currentPage = 1;
      state.posts.hasMore = true;
    },
    increasePostsPage: (state) => {
      state.posts.currentPage += 1;
    },
  },
});

export const {
  fetchCommunity,
  fetchCommunityPosts,
  addUploadedCommunityPost,
  increasePostsPage,
  updateCommunityPost,
  deleteCommunityPost,
  clearCommunityPosts,
  deleteCommunity,
} = communitySlice.actions;
export default communitySlice.reducer;
