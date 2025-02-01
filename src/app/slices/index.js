import { combineReducers } from "redux";
import userSlice from "./user";

const rootReducer = combineReducers({
  user: userSlice,
});

export default rootReducer;
