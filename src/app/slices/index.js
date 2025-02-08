import { combineReducers } from "redux";
import userSlice from "./user";
import postsSlice from "./posts";

const rootReducer = combineReducers({
  user: userSlice,
  posts: postsSlice,
});

export default rootReducer;
