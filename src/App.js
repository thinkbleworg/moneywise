import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import clsx from "clsx";

import Header from "./components/header/Header";
import { Routing } from "./routes/Routing";
import { isHomeRoute } from "./routes/RoutingHelper";
import { CustomThemeContext } from "./theme/ThemeProvider";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Switch from "@material-ui/core/Switch";

import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";

import AuthComponent, { AuthenticationProvider } from "./components/auth/Auth";

Amplify.configure(awsconfig);
// Auth.configure(awsconfig);

const useStyles = makeStyles((theme) => ({
  transactionLayer: {
    maxWidth: 500,
  },
  content: {
    flexGrow: 1,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  toolbar: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },

  container: {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: 0,
    paddingRight: 0,
    transition: theme.transitions.create("justifyContent", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  containerPadLeft: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "80px",
    },
  },
}));

function App() {
  const classes = useStyles();
  const homeRoute = isHomeRoute(window.location.pathname);

  const { currentTheme, setTheme } = useContext(CustomThemeContext);
  const isDark = Boolean(currentTheme === "dark");

  const handleThemeChange = (event) => {
    const { checked } = event.target;
    if (checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className="App">
      <CssBaseline />
      <AuthenticationProvider>
        <AuthComponent>
          <Header />
          <Switch checked={isDark} onChange={handleThemeChange} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Container
              maxWidth="md"
              className={clsx(
                classes.container,
                homeRoute && classes.containerPadLeft
              )}
            >
              <Routing />
            </Container>
          </main>
        </AuthComponent>
      </AuthenticationProvider>
    </div>
  );
}

export default App;

// References
// Theming - https://www.58bits.com/blog/2020/05/27/material-ui-theme-switcher-react
