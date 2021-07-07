import React, { useMemo, forwardRef } from "react";
import { makeStyles } from "@material-ui/core";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CategoryIcon from "@material-ui/icons/Category";

import { Link } from "react-router-dom";
import { Routes } from "../../routes/Routing";

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  list: {
    width: 250,
  },
}));

const mainDrawerList = [
  {
    text: "My Account",
    value: "my-account",
    icon: <AccountCircleIcon />,
    isModal: true,
    route: "",
  },
  {
    text: "My Wallets",
    value: "my-wallets",
    icon: <AccountBalanceWalletIcon />,
    isModal: false,
    route: "",
  },
  {
    text: "Categories",
    value: "categories",
    icon: <CategoryIcon />,
    isModal: false,
    route: "",
  },
];

const MainDrawer = (props) => {
  const classes = useStyles();

  const { openDrawer, handleDrawerClose, isSelectedRoute } = props;

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    handleDrawerClose();
  };

  // Merge both the mainDrawerList and Routes
  const drawerList = mainDrawerList.map((list) => {
    let routeObj = Routes.find((r) => r.value === list.value);
    if (routeObj && routeObj !== null) {
      list.route = {
        path: routeObj.path,
      };
    }
    return list;
  });

  const RouteLinks = ({ list }) => {
    const to = list.route.path;
    // https://material-ui.com/guides/composition/#react-router
    const CustomLink = useMemo(
      () =>
        forwardRef((linkProps, ref) => (
          <Link ref={ref} to={to} {...linkProps} />
        )),
      [to]
    );

    return (
      <>
        <ListItem button component={CustomLink} selected={isSelectedRoute(to)}>
          <ListItemIcon>{list.icon}</ListItemIcon>
          <ListItemText primary={list.text} />
        </ListItem>
      </>
    );
  };

  const mainDrawerListUI = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {drawerList.map((list, idx) => {
          return list.route !== "" && list.route.path ? (
            <RouteLinks list={list} key={list.value} />
          ) : (
            <ListItem button key={list.value}>
              <ListItemIcon>{list.icon}</ListItemIcon>
              <ListItemText primary={list.text} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <Drawer anchor="left" open={openDrawer}>
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      {mainDrawerListUI()}
    </Drawer>
  );
};

export default MainDrawer;
