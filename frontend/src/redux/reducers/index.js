import { combineReducers } from "redux";
import authReducer from "./authReducer";

let rootReducer = combineReducers({
  authenticated: authReducer
});
export default rootReducer;
