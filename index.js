import React, { Component } from "react";
import { AppRegistry, AsyncStorage } from "react-native";
import App from "./App/App";
import { AUTH_USER } from "./App/Actions/Auth";
import sStorage from "./App/Actions/Storage";
// redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import appReducer from "./App/Reducers";
import thunk from "redux-thunk";

const store = createStore(appReducer, applyMiddleware(thunk));

sStorage.getItem("token").then(token => {
  if (token) {
    store.dispatch({ type: AUTH_USER });
  }
});

// App
const Reptceipts = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent("ReptceiptsMobile", () => Reptceipts);
