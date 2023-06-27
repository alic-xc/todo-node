import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store/store";
import { Provider } from "react-redux";
import { UserProvider } from "./context/UserContext";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>
  </React.StrictMode>
);
