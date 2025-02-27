import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  hasMore: true,
  currentPage: 1,
  isLoading: false,
};

const jobsSlice = createSlice({
  name: "Jobs",
  initialState,
  reducers: {
    // Fetching Jobs
    fetchJobs: (state, action) => {
      state.data = [...state.data, ...action.payload];
      if (action.payload.length < 9) {
        state.hasMore = false;
      }
    },

    // Updating existing job
    updateJob: (state, action) => {
      state.data = state.data.map((job) => {
        if (job._id !== action.payload._id) {
          return job;
        } else {
          return action.payload;
        }
      });
    },

    // Deleting existing job
    deleteJob: (state, action) => {
      state.data = state.data.filter((job) => job._id !== action.payload._id);
    },

    // Increasing the current page
    increateCurrentPage: (state) => {
      state.currentPage = state.currentPage + 1;
    },

    // Change Loading State
    changeLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // Reseting the jobs state
    resetJobs: (state) => {
      state.data = [];
      state.currentPage = 1;
      state.hasMore = true;
      state.isLoading = false;
    },
  },
});

export const {
  deleteJob,
  fetchJobs,
  increateCurrentPage,
  updateJob,
  changeLoading,
  resetJobs,
} = jobsSlice.actions;
export default jobsSlice.reducer;
