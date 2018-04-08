import {
    SHOW_LOADER,
    HIDE_LOADER,
    TOGGLE_SCAN,
    TOGGLE_SEARCH
  } from '../Actions/UI';
  
  export default function UIReducer(state = {}, action) {
    switch (action.type) {
        case SHOW_LOADER:
            return { ...state, loading: true };
        case HIDE_LOADER:
            return { ...state, loading: false };
        case TOGGLE_SCAN:
            return { ...state, scanMethod: action.scan };
        case TOGGLE_SEARCH:
            return { ...state, displaySearch: action.display };
        default:
            return state;
    }
  }
  