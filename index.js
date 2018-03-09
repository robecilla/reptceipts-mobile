import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import App from './App/App';

// redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import appReducer from './App/Reducers';
import thunk from 'redux-thunk';

const store = createStore(appReducer, applyMiddleware(thunk));

// App
const Reptceipts = () => (
    <Provider store={store}>
         <App />
    </Provider>
)

AppRegistry.registerComponent('ReptceiptsMobile', () => Reptceipts);
