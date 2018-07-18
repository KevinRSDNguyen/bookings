import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import { rentalReducer } from "./rental-reducer";

export const init = () => {
  const reducer = combineReducers({
    rentals: rentalReducer
  });

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

  return store;
};
