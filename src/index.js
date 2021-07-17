import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store/configureStore";
import { BrowserRouter } from "react-router-dom";
import CustomThemeProvider from "./theme/ThemeProvider";
import { SnackbarProvider } from "notistack";

const Root = () => {
  const reduxStore = configureStore();
  return (
    <CustomThemeProvider>
      <SnackbarProvider hideIconVariant={true}>
        <ReduxProvider store={reduxStore}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ReduxProvider>
      </SnackbarProvider>
    </CustomThemeProvider>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>,
  document.querySelector("#root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
