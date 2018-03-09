import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import getAppReducer from "./Reducers";

export default function getStore(navReducer) {
    const store = createStore(
        getAppReducer(navReducer),
        undefined,
        applyMiddleware(thunk)
    );

    return store;
}