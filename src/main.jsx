import App from "./App.jsx";
import "./main.scss";
import "bootstrap/dist/css/bootstrap.min.css";

// import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
