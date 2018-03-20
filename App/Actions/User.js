import axios from 'axios';
import { ROOT_URL } from './config';
import { UNAUTH_USER } from './Auth';
import sStorage from './Storage';

export const SET_USER = 'SET_USER';
export const GET_USER_RECEIPTS = 'GET_USER_RECEIPTS';

export function getUser() {
  return function(dispatch) {
    sStorage.getItem('token').then((token) => {
        /* JWT determines the identity of the user */
        axios.defaults.headers.common['Authorization'] =
        'Bearer ' + token;

        axios
        .get(`${ROOT_URL}/api/user`)
        .then(response => {
          console.log(response);

            if (response.status >= 200 && response.status < 300) {
                dispatch({
                    type: SET_USER,
                    payload: response.data.user
                });
            }
        })
        .catch(error => {
          console.log(error);

            if (error.response) {
              //dispatch(authError(error.response.data));
              console.log(error.response);
              if(error.response.status === 401) {
                dispatch({
                  type: UNAUTH_USER
                });
              }
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
    });
  };
}

export function getUserReceipts() {
  return function(dispatch) {
    sStorage.getItem('token').then((token) => {

      /* JWT determines the identity of the user */
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

      axios
      .get(`${ROOT_URL}/api/receipt`)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          dispatch({
            type: GET_USER_RECEIPTS,
            payload: response.data
          });

          dispatch({
              type: HIDE_LOADER
          });
        }
      })
      .catch(error => {
        if (error.response) {
          if(error.response.status === 401) {
            dispatch({
              type: UNAUTH_USER
            });
          }
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
    });
  };
}
