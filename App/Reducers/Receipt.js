import { GET_RECEIPT_DETAIL, DELETE_SUCCESS } from '../Actions/Receipt';

export default function receiptReducer(state = {}, action) {
  switch (action.type) {
    case GET_RECEIPT_DETAIL:
      return { ...state, receiptDetail: action.payload };
    case DELETE_SUCCESS:
      return { ...state, deleted: action.response };
    default:
      return state;
  }
}
