import axios from "axios";
import { ROOT_URL } from "./config";
import { SHOW_LOADER, HIDE_LOADER } from "./UI";
import { UNAUTH_USER } from "./Auth";
import sStorage from "./Storage";
import { NavigationActions } from "react-navigation";

export const SET_USER = "SET_USER";
export const GET_USER_RECEIPTS = "GET_USER_RECEIPTS";
export const UPDATE_ERROR = "UPDATE_ERROR";
export const DELETE_ACC_RESULT = "DELETE_RESULT";

export function getUser() {
  return function(dispatch) {
    dispatch({
      type: SHOW_LOADER
    });

    sStorage.getItem("token").then(token => {
      /* JWT determines the identity of the user */
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;

      axios
        .get(`${ROOT_URL}/api/user/JWTuser`)
        .then(response => {
          console.log("got user");
          if (response.status >= 200 && response.status < 300) {
            dispatch({
              type: SET_USER,
              payload: response.data.response.user
            });
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            dispatch({
              type: UNAUTH_USER
            });
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

export function getUserReceipts() {
  return function(dispatch) {
    dispatch({
      type: SHOW_LOADER
    });

    sStorage.getItem("token").then(token => {
      /* JWT determines the identity of the user */
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;

      axios
        .get(`${ROOT_URL}/api/receipt`)
        .then(response => {
          console.log("got receipts");
          if (response.status >= 200 && response.status < 300) {
            dispatch({
              type: GET_USER_RECEIPTS,
              payload: response.data.response
            });
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            dispatch({
              type: UNAUTH_USER
            });
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

export function updateUser(values, navigation) {
  return function(dispatch) {
    dispatch({
      type: SHOW_LOADER
    });

    values._method = "PUT";

    sStorage.getItem("token").then(token => {
      axios({
        method: "POST",
        url: `${ROOT_URL}/api/user/${values.id}`,
        headers: { Authorization: "Bearer " + token },
        data: values
      })
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            navigation.dispatch(
              NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "Profile" })]
              })
            );
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            dispatch({
              type: UNAUTH_USER
            });
          }

          dispatch({
            type: UPDATE_ERROR,
            payload: error.response
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

export function deleteAccount(id) {
  return function(dispatch) {
    dispatch({
      type: SHOW_LOADER
    });

    sStorage.getItem("token").then(token => {
      axios({
        method: "DELETE",
        url: `${ROOT_URL}/api/user/${id}`,
        headers: { Authorization: "Bearer " + token }
      })
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            dispatch({
              type: UNAUTH_USER
            });
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            dispatch({
              type: UNAUTH_USER
            });
          }

          dispatch({
            type: DELETE_ACC_RESULT,
            payload: error.response
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
