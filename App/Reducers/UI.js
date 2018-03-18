import {
    SHOW_LOADER,
    HIDE_LOADER,
    TOGGLE_QR_DEFAULT,
    TOGGLE_NFC_DEFAULT
  } from '../Actions/UI';
  
  export default function UIReducer(state = {}, action) {
    switch (action.type) {
      case SHOW_LOADER:
        return { ...state, loading: true };
    case HIDE_LOADER:
        return { ...state, loading: false };
    case TOGGLE_QR_DEFAULT:
        return { ...state, scanMethod: false };
    case TOGGLE_NFC_DEFAULT:
        return { ...state, scanMethod: true };
      default:
        return state;
    }
  }
  