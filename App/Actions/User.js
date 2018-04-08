import axios from 'axios';
import { ROOT_URL } from './config';
import { SHOW_LOADER, HIDE_LOADER } from './UI';
import { UNAUTH_USER } from './Auth';
import sStorage from './Storage';

export const SET_USER = 'SET_USER';
export const GET_USER_RECEIPTS = 'GET_USER_RECEIPTS';
export const UPDATE_ERROR = 'UPDATE_ERROR';
export const DELETE_ACC_RESULT = 'DELETE_RESULT';

export function getUser() {
  return function(dispatch) {

    dispatch({
      type: SHOW_LOADER
    });

    sStorage.getItem('token').then((token) => {
        /* JWT determines the identity of the user */
        axios.defaults.headers.common['Authorization'] =
        'Bearer ' + token;

        axios
        .get(`${ROOT_URL}/api/user/JWTuser`)
        .then(response => {
          console.log(response);

            if (response.status >= 200 && response.status < 300) {
                dispatch({
                    type: SET_USER,
                    payload: response.data.response.user
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
          }).then(() => {
            // Hide loader on request completion
            dispatch({
              type: HIDE_LOADER
            });
          });
    });
  };
}

export function getUserReceipts() {
  return function(dispatch) {

    dispatch({
      type: SHOW_LOADER
    });


    sStorage.getItem('token').then((token) => {

      /* JWT determines the identity of the user */
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

      axios
      .get(`${ROOT_URL}/api/receipt`)
      .then(response => {
        console.log(response);
        if (response.status >= 200 && response.status < 300) {
          dispatch({
            type: GET_USER_RECEIPTS,
            payload: response.data.response
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
      }).then(() => {
            // Hide loader on request completion
            dispatch({
              type: HIDE_LOADER
            });
          });
    });
  };
}

export function updateUser(values, navigate) {
  return function(dispatch) {

    dispatch({
      type: SHOW_LOADER
    });

    console.log(values);

    values._method = 'PUT';

    sStorage.getItem('token').then((token) => {
      axios({
        method: 'POST',
        url: `${ROOT_URL}/api/user/${values.id}`,
        headers : { Authorization: 'Bearer ' + token },
        data : values
      })
        .then(response => {
          console.log(response);
          if (response.status >= 200 && response.status < 300) {
            navigate('Profile');
          }
        })
        .catch(error => {
          console.log(error.response);
            dispatch({
              type: UPDATE_ERROR,
              payload: error.response
            });
        }).then(() => {
          // Hide loader on request completion
          dispatch({
            type: HIDE_LOADER
          });
        });
    });
  };
}

export function deleteAccount(id) {
  return function(dispatch) {
    dispatch({
      type: SHOW_LOADER
    });

    sStorage.getItem('token').then((token) => {
      axios({
        method: 'DELETE',
        url: `${ROOT_URL}/api/user/${id}`,
        headers : { Authorization: 'Bearer ' + token }
      })
        .then(response => {
          console.log(response);
          if (response.status >= 200 && response.status < 300) {
            dispatch({
              type: UNAUTH_USER
            });
          }
        })
        .catch(error => {
          console.log(error.response);
          dispatch({
            type: DELETE_ACC_RESULT,
            payload: error.response
          });
        }).then(() => {
          // Hide loader on request completion
          dispatch({
            type: HIDE_LOADER
          });
        });
    });
  };
}