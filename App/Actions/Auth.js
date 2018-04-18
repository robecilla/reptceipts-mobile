import axios from "axios";
import { SHOW_LOADER, HIDE_LOADER } from "./UI";
import { ROOT_URL } from "./config";
import sStorage from "./Storage";

export const AUTH_USER = "AUTH_USER";
export const UNAUTH_USER = "UNAUTH_USER";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const LOGIN_ERROR = "LOGIN_ERROR";

/* Login */
export function signinUser(values) {
  return function(dispatch) {
    dispatch({
      type: SHOW_LOADER
    });
    // Here values handles email and password
    axios
      .post(`${ROOT_URL}/api/login`, values)
      .then(response => {
        // Save user specific JWT
        sStorage.setItem("token", response.data.response.token);

        // If request went good, dispatch redux action to change auth state
        dispatch({
          type: AUTH_USER
        });
      })
      // If bad request, call the error handler
      .catch(error => {
        console.log(error.response);
        dispatch({
          type: LOGIN_ERROR,
          payload: error.response.data.response
        });
      })
      .then(() => {
        // Hide loader on request completion
        dispatch({
          type: HIDE_LOADER
        });
      });
  };
}

/* Register */
export function registerUser(values) {
  return function(dispatch) {
    dispatch({
      type: SHOW_LOADER
    });
    axios
      .post(`${ROOT_URL}/api/register`, values)
      .then(response => {
        sStorage.setItem("token", response.data.response.token);

        dispatch({
          type: AUTH_USER
        });
      })
      .catch(error => {
        dispatch({
          type: REGISTER_ERROR,
          payload: error.response.data.response
        });
      })
      .then(() => {
        // Hide loader on request completion
        dispatch({
          type: HIDE_LOADER
        });
      });
  };
}

export function signoutUser() {
  sStorage.removeItem("token");
  return {
    type: UNAUTH_USER
  };
}
