import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { init } from "./reducers";
const store = init();
// import registerServiceWorker from './registerServiceWorker';

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
// registerServiceWorker();
