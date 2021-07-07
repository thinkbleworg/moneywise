import React, { useState, useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import MainDrawer from "./MainDrawer";
import SideBarDrawer from "./SideBarDrawer";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    sidebarMenuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      maxHeight: "64px",
    },
  })
);

const WithAppBarHeader = (WrappedComponent, routeProps) => {
  const AppBarHOC = ({ ...props }) => {
    // console.log("appbarhoc ----", props, WrappedComponent);
    const classes = useStyles();
    const history = useHistory();

    const [openDrawer, setOpenDrawer] = useState(false);
    const [openSideBar, setOpenSideBar] = useState(false);

    const handleDrawerOpen = () => {
      setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
      setOpenDrawer(false);
    };

    const handleSideBarToggle = () => {
      setOpenSideBar(!openSideBar);
    };

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            {routeProps.showDrawerControls ? (
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  history.push("/");
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            )}
            <WrappedComponent {...props} />
            {routeProps.showDrawerControls && (
              <IconButton
                color="inherit"
                aria-label="open sidebar"
                edge="end"
                onClick={handleSideBarToggle}
                className={classes.sidebarMenuButton}
              >
                <UnfoldMoreIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        <MainDrawer
          openDrawer={openDrawer}
          handleDrawerClose={handleDrawerClose}
          isSelectedRoute={routeProps.isSelectedRoute}
        />
        {routeProps.showDrawerControls && (
          <SideBarDrawer
            openSideBar={openSideBar}
            handleSideBarToggle={handleSideBarToggle}
          />
        )}
      </div>
    );
  };
  return AppBarHOC;
};

export default WithAppBarHeader;
