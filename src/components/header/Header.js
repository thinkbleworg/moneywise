import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

import { Routes } from "../../routes/Routing";
import { currentRoute as CR, isHomeRoute } from "../../routes/RoutingHelper";
import TransactionHeader from "./pages/TransactionHeader";

import withAppBarHeader from "./withAppBar";

const Header = (props) => {
  const [showDrawerControls, setShowDrawerControls] = useState(false);

  const isSelectedRoute = (routeName) => {
    return props.location.pathname === routeName ? true : false;
  };

  const currentRoute = CR(props.location.pathname);

  useEffect(() => {
    if (props.location.pathname) {
      // console.log("props ----");
      let matchFound = isHomeRoute(props.location.pathname);
      setShowDrawerControls(matchFound);
    }
  }, [props.location.pathname]);

  const DynamicHeader =
    currentRoute && currentRoute.headerComponent !== ""
      ? currentRoute.headerComponent
      : TransactionHeader;

  const DynamicHeaderWithAppBar = withAppBarHeader(DynamicHeader, {
    showDrawerControls: showDrawerControls,
    isSelectedRoute: isSelectedRoute,
  });

  return <DynamicHeaderWithAppBar />;
};
export default withRouter(Header);
