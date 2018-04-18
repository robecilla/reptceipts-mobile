import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./Auth";
import UIReducer from "./UI";
import userReducer from "./User";
import receiptReducer from "./Receipt";

const appReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  ui: UIReducer,
  user: userReducer,
  receipt: receiptReducer
});

const rootReducer = (state, action) => {
  if (action.type === "UNAUTH_USER") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
