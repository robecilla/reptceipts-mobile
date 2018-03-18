import axios from 'axios';
import { HIDE_LOADER } from './UI';
import { ROOT_URL } from './config';
import sStorage from './Storage';

export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const FETCH_MESSAGE = 'FETCH_MESSAGE';

/* Login */
export function signinUser(values) {
  return function(dispatch) {
    // Here values handles email and password
    axios
      .post(`${ROOT_URL}/api/login`, values)
      .then(response => {

        console.log(response);

        // Save user specific JWT
        sStorage.setItem('token', response.data.token);

        // If request went good, dispatch redux action to change auth state
        dispatch({
          type: AUTH_USER
        });
  
        dispatch({
          type: HIDE_LOADER
        });

      })
      // If bad request, call the error handler
      .catch(error => {
        
        dispatch({
          type: HIDE_LOADER
        });
        // Error
        if (error.response) {
          console.log(error.response);
          dispatch(authError(error.response.data));
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      });
  };
}

/* Register */
export function registerUser(values) {
  return function(dispatch) {
    axios
      .post(`${ROOT_URL}/api/register`, values)
      .then(response => {

        console.log(response);
        sStorage.setItem('token', response.data.token);

        dispatch({
          type: AUTH_USER
        });
  
        dispatch({
          type: HIDE_LOADER
        });

      })
      .catch(error => {
        dispatch({
          type: HIDE_LOADER
        });

        if (error.response) {
          dispatch(authError(error.response.data));
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  sStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  };
}
