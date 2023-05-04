import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import StateProvider from "./contexts/firebase/StateProvider";
import { Provider } from "react-redux";
import { store } from "./lib/store";
import { firebaseReducer, initialState } from "./reducers/firebaseReducers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StateProvider reducer={firebaseReducer} initialState={initialState}>
      <App />
    </StateProvider>
  </Provider>
);
