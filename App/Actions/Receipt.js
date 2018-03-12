import axios from 'axios';
import { HIDE_LOADER } from './UI';

export const CREATE_RECEIPT = 'CREATE_RECEIPT';

const ROOT_URL = 'https://reptceipts.com';

/* Login */
export function createReceipt(values, navigate) {
    console.log(values);

  return function(dispatch) {
    // Here values handles email and password
    // axios
    //   .post(`${ROOT_URL}/api/login`, values)
    //   .then(response => {


    dispatch({
        type: HIDE_LOADER
      });

    navigate('Receipts');

        // Save user specific JWT
  //       localStorage.setItem('token', response.data.token);
  //       // If request went good, dispatch redux action to change auth state
  //       dispatch({
  //         type: AUTH_USER
  //       });
  //       // Redirect user to dashboard
  //       history.push('/menu/dashboard');
  //     })
  //     // If bad request, call the error handler
  //     .catch(error => {
  //       // Error
  //       if (error.response) {
  //         dispatch(authError(error.response.data));
  //       } else if (error.request) {
  //         // The request was made but no response was received
  //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //         // http.ClientRequest in node.js
  //         console.log(error.request);
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         console.log('Error', error.message);
  //       }
  //     });
  };
}