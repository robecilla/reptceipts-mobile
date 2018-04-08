import { GET_RECEIPT_DETAIL, DELETE_ERROR } from '../Actions/Receipt';

export default function receiptReducer(state = {}, action) {
  switch (action.type) {
    case GET_RECEIPT_DETAIL:
      return { ...state, receiptDetail: action.payload };
    case DELETE_ERROR:
      return { ...state, deleteError: action.response };
    default:
      return state;
  }
}
