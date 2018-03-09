import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './Auth';

export default appReducer = combineReducers({
  form: formReducer,
  auth: authReducer
});
