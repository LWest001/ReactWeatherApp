import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store";
import App_redux from "./app/App_redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App_redux />
    </Provider>
  </React.StrictMode>
);
