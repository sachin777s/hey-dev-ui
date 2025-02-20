import { combineReducers } from "redux";
import userSlice from "./user";
import postsSlice from "./posts";
import communitySlice from "./community";

const rootReducer = combineReducers({
  user: userSlice,
  posts: postsSlice,
  community: communitySlice,
});

export default rootReducer;
