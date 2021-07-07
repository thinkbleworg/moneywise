import React from "react";
import { Switch, Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import Home from "./pages/Home";
import Category from "./pages/Category";
import Transaction from "./pages/Transaction";
import MyWallet from "./pages/MyWallet";
import TransactionHeader from "../components/header/pages/TransactionHeader";
import CategoryHeader from "../components/header/pages/CategoryHeader";
import WalletHeader from "../components/header/pages/WalletHeader";

const Routes = [
  {
    path: "/",
    name: "Home",
    value: "home",
    component: Transaction,
    headerComponent: TransactionHeader,
    additionalProps: {
      exact: true,
    },
  },
  {
    path: "/categories/",
    name: "Categories",
    value: "categories",
    component: Category,
    headerComponent: CategoryHeader,
    additionalProps: null,
  },
  {
    path: "/wallet/",
    name: "Transactions",
    value: "wallet",
    component: Transaction,
    headerComponent: TransactionHeader,
    additionalProps: null,
  },
  {
    path: "/my-wallets/",
    name: "My Wallets",
    value: "my-wallets",
    component: MyWallet,
    headerComponent: WalletHeader,
    additionalProps: null,
  },
];

class Routing extends React.Component {
  render() {
    return (
      <Switch>
        {Routes.map((routeObj) => (
          <Route
            path={routeObj.path}
            key={routeObj.path}
            {...routeObj.additionalProps}
          >
            {({ match }) => (
              <CSSTransition
                in={match != null}
                appear={true}
                timeout={300}
                classNames="zoom-transition"
                unmountOnExit
              >
                <routeObj.component />
              </CSSTransition>
            )}
          </Route>
        ))}
      </Switch>
    );
  }
}

export { Routes, Routing };
