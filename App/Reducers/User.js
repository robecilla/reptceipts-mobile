import { SET_USER, GET_USER_RECEIPTS, UPDATE_ERROR, DELETE_ACC_RESULT } from '../Actions/User';

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case GET_USER_RECEIPTS:
      return { ...state, receipts: action.payload };
    case UPDATE_ERROR:
      return { ...state, deleteError: action.response };
    case DELETE_ACC_RESULT:
      return { ...state, deleteAccError: action.payload };
    default:
      return state;
  }
}
