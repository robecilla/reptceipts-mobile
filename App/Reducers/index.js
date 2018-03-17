import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './Auth';
import UIReducer from './UI';
import userReducer from './User';
import receiptReducer from './Receipt';

export default appReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  ui: UIReducer,
  user: userReducer,
  receipt: receiptReducer
});
