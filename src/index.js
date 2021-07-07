import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store/configureStore";
import { BrowserRouter } from "react-router-dom";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

const RootApp = () => {
  const reduxStore = configureStore();
  return (
    <ReduxProvider store={reduxStore}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ReduxProvider>
  );
};

const RootAppWithAuth = withAuthenticator(RootApp);

ReactDOM.render(
  <BrowserRouter>
    <RootAppWithAuth />
  </BrowserRouter>,
  document.querySelector("#root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
