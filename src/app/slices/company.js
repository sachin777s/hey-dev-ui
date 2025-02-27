import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  jobs: [],
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    loadCompany: (state, action) => {
      state.data = action.payload;
    },
    addCreatedJob: (state, action) => {
      state.jobs = [...state.jobs, action.payload];
    },
    updateJob: (state, action) => {
      state.jobs = state.jobs.map((job) => {
        if (job._id !== action.payload._id) {
          return job;
        } else {
          return action.payload;
        }
      });
    },
    deleteJob: (state, action) => {
      state.jobs = state.jobs.filter((job) => job._id !== action.payload._id);
    },
    addJobs: (state, action) => {
      state.jobs = [...state.jobs, ...action.payload];
    },
  },
});

export const { loadCompany, addCreatedJob, addJobs, deleteJob, updateJob } =
  companySlice.actions;
export default companySlice.reducer;
