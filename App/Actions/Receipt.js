import axios from 'axios';
import { SHOW_LOADER, HIDE_LOADER } from './UI';
import { ROOT_URL }  from './config';
import sStorage from './Storage';
import { signOutUser } from './Auth';

export const CREATE_RECEIPT = 'CREATE_RECEIPT';
export const GET_RECEIPT_DETAIL = 'GET_RECEIPT_DETAIL';
export const DELETE_ERROR = 'DELETE_ERROR';

export function createReceipt(values, navigate, user_id) {
  return function(dispatch) {

    dispatch({
      type: SHOW_LOADER
    });

    let receipt = JSON.parse(values);
    receipt.user_id = user_id;
    for(val in receipt) {
      if(val === 'items') {
        receipt.items = JSON.stringify(receipt[val]);
      }
    }

    sStorage.getItem('token').then((token) => {

      axios.defaults.headers.common['Authorization'] =
      'Bearer ' + token;

      axios
        .post(`${ROOT_URL}/api/receipt`, receipt)
        .then(response => {
            console.log(response);
            if(response.status >= 200) {
              navigate('Receipts');
            }
        })
        // If bad request, call the serror handler
        .catch(error => {
          if(error.response.status === 401) {
            signOutUser();
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

export function getReceiptDetail(id) {
  return function(dispatch) {
    dispatch({
      type: SHOW_LOADER
    });

    sStorage.getItem('token').then((token) => {
      /* JWT determines the identity of the user */
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + token;
      axios({
        method: 'GET',
        url: `${ROOT_URL}/api/receipt/` + id
      })
      .then(response => {
        const receiptDetail = response.data.response;
        dispatch({
          type: GET_RECEIPT_DETAIL,
          payload: receiptDetail
        });
      })
      .catch(error => {
        if (error.response) {
          //dispatch(authError(error.response.data));
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

export function deleteReceipt(id, navigate) {
  return function(dispatch) {

    dispatch({
      type: SHOW_LOADER
    });
    
    sStorage.getItem('token').then((token) => {

      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + token;

      axios({
        method: 'DELETE',
        url: `${ROOT_URL}/api/receipt/` + id,
        headers : { Authorization: 'Bearer ' + token }
      })
      .then(response => {
        console.log(response);
        if(response.status >= 200) {
          navigate('Receipts');
        }
      })
      .catch(error => {
        console.log(error.response);
        dispatch({
          type: DELETE_ERROR,
          response: true
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