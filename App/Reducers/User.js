import { SET_USER, GET_USER_RECEIPTS } from '../Actions/User';

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case GET_USER_RECEIPTS:
      return { ...state, receipts: action.payload };
    default:
      return state;
  }
}
