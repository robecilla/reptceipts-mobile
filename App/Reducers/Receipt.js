import {
  GET_RECEIPT_DETAIL,
  DELETE_ERROR,
  SCAN_SUCCESS,
  SCAN_FAIL
} from "../Actions/Receipt";

export default function receiptReducer(state = {}, action) {
  switch (action.type) {
    case SCAN_SUCCESS:
      return { ...state, scanSucceed: action.payload };
    case SCAN_FAIL:
      return { ...state, scanSucceed: action.payload };
    case GET_RECEIPT_DETAIL:
      return { ...state, receiptDetail: action.payload };
    case DELETE_ERROR:
      return { ...state, deleteError: action.response };
    default:
      return state;
  }
}
