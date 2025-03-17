import { combineReducers } from "redux";
import userSlice from "./user";
import postsSlice from "./posts";
import communitySlice from "./community";
import companySlice from "./company";
import jobsSlice from "./jobs";
import messagedUsersSlice from "./messaged-users";

const rootReducer = combineReducers({
  user: userSlice,
  posts: postsSlice,
  community: communitySlice,
  company: companySlice,
  jobs: jobsSlice,
  messagedUsers: messagedUsersSlice,
});

export default rootReducer;
