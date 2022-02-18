import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { setUser } from "./redux/slices/auth";

const token = localStorage.getItem("auth_token");
if (token) {
  // let decode = jwtDecode(token);
  store.dispatch(setUser());
}
// store.dispatch(setUser());
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
