import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core";
import clsx from "clsx";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";

import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AssessmentIcon from "@material-ui/icons/Assessment";
import ListAltIcon from "@material-ui/icons/ListAlt";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
    whiteSpace: "nowrap",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    // display: "none",
    // [theme.breakpoints.up("md")]: {
    //   display: "flex",
    // },
  },
  drawerClose: {
    width: theme.spacing(10) + 1,
    // [theme.breakpoints.up("sm")]: {
    //   width: theme.spacing(11) + 1,
    // },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    [theme.breakpoints.up("sm")]: {
      minHeight: "64px", //Height of the appbar
    },
  },
  listItem: {
    flexDirection: "column",
  },
  listItemIcon: {
    minWidth: "auto",
  },
}));

const sideBarDrawerList = [
  {
    text: "Transactions",
    value: "transaction",
    icon: <AccountBalanceWalletIcon />,
    isModal: false,
    route: "",
  },
  {
    text: "Reports",
    value: "reports",
    icon: <AssessmentIcon />,
    isModal: false,
    route: "",
  },
  {
    text: "Budget",
    value: "budget",
    icon: <ListAltIcon />,
    isModal: false,
    route: "",
  },
];

const SideBarDrawer = React.memo((props) => {
  const classes = useStyles();

  const { openSideBar, handleSideBarToggle, window } = props;
  const theme = useTheme();
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const sideBarDrawerListUI = () => (
    <List>
      {sideBarDrawerList.map((list) => (
        <ListItem button key={list.value} className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}>
            {list.icon}
          </ListItemIcon>
          <ListItemText className={classes.listItemText}>
            <Typography variant="caption" display="block">
              {list.text}
            </Typography>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );

  return (
    <nav className={classes.drawer}>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          container={container}
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={openSideBar}
          onClose={handleSideBarToggle}
          classes={{ paper: classes.drawerClose }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={classes.toolbar} />
          {sideBarDrawerListUI()}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          open
          classes={{ paper: classes.drawerClose }}
        >
          <div className={classes.toolbar} />
          {sideBarDrawerListUI()}
        </Drawer>
      </Hidden>
    </nav>
  );
});

export default SideBarDrawer;
