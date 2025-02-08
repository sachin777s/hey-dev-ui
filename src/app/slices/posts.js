import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  normalPosts: {
    posts: [],
    currentPage: 1,
    hasMore: true,
    isLoading: false,
  },
  ownedPosts: {
    posts: [],
    currentPage: 1,
    hasMore: true,
    isLoading: false,
  },
  likedPosts: {
    posts: [],
    currentPage: 1,
    hasMore: true,
    isLoading: false,
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Load more posts
    loadPosts: (state, action) => {
      if (action.payload.type === "owned") {
        state.ownedPosts.posts = [
          ...state.ownedPosts.posts,
          ...action.payload.posts,
        ];
        if (action.payload.posts.length < 3) {
          state.ownedPosts.hasMore = false;
        }
      } else if (action.payload.type === "liked") {
        state.likedPosts.posts = [
          ...state.likedPosts.posts,
          ...action.payload.posts,
        ];
        if (action.payload.posts.length < 3) {
          state.likedPosts.hasMore = false;
        }
      } else if (action.payload.type === "normal") {
        state.normalPosts.posts = [
          ...state.normalPosts.posts,
          ...action.payload.posts,
        ];
        if (action.payload.posts.length < 3) {
          state.normalPosts.hasMore = false;
        }
      } else {
        return;
      }
    },

    // Increasing page number
    inceaseCurrentPage: (state, action) => {
      if (action.payload.type === "owned") {
        state.ownedPosts.currentPage += 1;
      } else if (action.payload.type === "liked") {
        state.likedPosts.currentPage += 1;
      } else if (action.payload.type === "normal") {
        state.normalPosts.currentPage += 1;
      } else {
        return;
      }
    },

    // Updating existing single post
    updatePost: (state, action) => {
      const postToUpdate = action.payload;
      state.normalPosts.posts = state.normalPosts.posts.map((post) =>
        postToUpdate._id === post._id ? postToUpdate : post
      );

      state.likedPosts.posts = state.likedPosts.posts.map((post) =>
        postToUpdate._id === post._id ? postToUpdate : post
      );

      state.ownedPosts.posts = state.ownedPosts.posts.map((post) =>
        postToUpdate._id === post._id ? postToUpdate : post
      );
    },

    // Removing Existing Single post
    removePost: (state, action) => {
      state.normalPosts.posts = state.normalPosts.posts.filter(
        (post) => post._id !== action.payload._id
      );
      state.likedPosts.posts = state.likedPosts.posts.filter(
        (post) => post._id !== action.payload._id
      );
      state.ownedPosts.posts = state.ownedPosts.posts.filter(
        (post) => post._id !== action.payload._id
      );
    },

    // Post which is uploaded by current user
    addUploadedPost: (state, action) => {
      state.normalPosts.posts = [action.payload, ...state.normalPosts.posts];
      state.ownedPosts.posts = [action.payload, ...state.ownedPosts.posts];
    },
  },
});

export const {
  loadPosts,
  updatePost,
  removePost,
  addUploadedPost,
  inceaseCurrentPage,
} = postsSlice.actions;
export default postsSlice.reducer;
