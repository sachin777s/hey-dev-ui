import { combineReducers } from "redux";
import userSlice from "./user";
import postsSlice from "./posts";
import communitySlice from "./community";
import companySlice from "./company";
import jobsSlice from "./jobs";

const rootReducer = combineReducers({
  user: userSlice,
  posts: postsSlice,
  community: communitySlice,
  company: companySlice,
  jobs: jobsSlice,
});

export default rootReducer;
