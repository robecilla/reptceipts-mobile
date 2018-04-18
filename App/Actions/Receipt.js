import axios from "axios";
import { SHOW_LOADER, HIDE_LOADER } from "./UI";
import { ROOT_URL } from "./config";
import sStorage from "./Storage";
import { signOutUser } from "./Auth";
import { NavigationActions } from "react-navigation";

export const CREATE_RECEIPT = "CREATE_RECEIPT";
export const GET_RECEIPT_DETAIL = "GET_RECEIPT_DETAIL";
export const DELETE_ERROR = "DELETE_ERROR";
export const SCAN_SUCCESS = "SCAN_SUCCESS";
export const SCAN_FAIL = "SCAN_FAIL";

export function createReceipt(values, navigation, user_id, scan_type) {
  return function(dispatch) {
    dispatch({
      type: SHOW_LOADER
    });

    let receipt = JSON.parse(values);
    receipt.user_id = user_id;
    receipt.scan_type = scan_type;

    for (val in receipt) {
      if (val === "items") {
        receipt.items = JSON.stringify(receipt[val]);
      }
    }

    sStorage.getItem("token").then(token => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios
        .post(`${ROOT_URL}/api/receipt`, receipt)
        .then(response => {
          if (response.status >= 200) {
            dispatch({
              type: SCAN_SUCCESS,
              payload: true
            });
          }
        })
        // If bad request, call the serror handler
        .catch(error => {
          if (error.response.status === 401) {
            signOutUser();
          }
          dispatch({
            type: SCAN_FAIL,
            payload: false
          });
        })
        .then(() => {
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

    sStorage.getItem("token").then(token => {
      /* JWT determines the identity of the user */
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios({
        method: "GET",
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
          if (error.response.status === 401) {
            signOutUser();
          }
        })
        .then(() => {
          // Hide loader on request completion
          dispatch({
            type: HIDE_LOADER
          });
        });
    });
  };
}

export function deleteReceipt(id, navigation) {
  return function(dispatch) {
    dispatch({
      type: SHOW_LOADER
    });

    sStorage.getItem("token").then(token => {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;

      axios({
        method: "DELETE",
        url: `${ROOT_URL}/api/receipt/` + id,
        headers: { Authorization: "Bearer " + token }
      })
        .then(response => {
          if (response.status >= 200) {
            navigation.dispatch(
              NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.replace({ routeName: "Receipts" })]
              })
            );
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            signOutUser();
          }

          dispatch({
            type: DELETE_ERROR,
            response: true
          });
        })
        .then(() => {
          // Hide loader on request completion
          dispatch({
            type: HIDE_LOADER
          });
        });
    });
  };
}
