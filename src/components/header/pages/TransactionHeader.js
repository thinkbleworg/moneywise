import React, { useState, forwardRef } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import SearchIcon from "@material-ui/icons/Search";
import EventIcon from "@material-ui/icons/Event";
import CategoryIcon from "@material-ui/icons/Category";
import PaymentIcon from "@material-ui/icons/Payment";
import AddIcon from "@material-ui/icons/Add";
import MoreIcon from "@material-ui/icons/MoreVert";

import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import AddTransactionDialog from "../../modal/forms/AddTransaction";

const mobileMenuId = "primary-header-menu-mobile";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    sectionDesktop: {
      display: "none",
      listStyle: "none",
      margin: 0,
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    addTransaction: {
      margin: theme.spacing(1),
    },
  })
);

const menuUI = (menuObj) => {
  return (
    <Tooltip title={menuObj.label}>
      <IconButton
        color="inherit"
        onClick={menuObj.clickHandler}
        aria-label={menuObj.label}
      >
        <Badge color="secondary">{menuObj.icon}</Badge>
      </IconButton>
    </Tooltip>
  );
};

const TransactionHeader = (props) => {
  console.log("transaction header props", props);

  const classes = useStyles();

  const [viewBy, setViewBy] = useState("category");

  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);

  const [openAddTransactionDialog, setOpenAddTransactionDialog] =
    useState(false);

  const handleMobileMenuOpen = (evt) => {
    setMobileMenuAnchorEl(evt.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };
  const handleViewBy = () => {
    if (viewBy === "category") setViewBy("transaction");
    else setViewBy("category");
  };

  const handleOpenAddTransactionDialog = () => {
    setOpenAddTransactionDialog(true);
  };

  const handleCloseAddTransactionDialog = () => {
    setOpenAddTransactionDialog(false);
  };

  const handleSaveAddTransactionDialog = () => {
    handleCloseAddTransactionDialog();
  };

  //   ViewBy UI
  const ViewBy = () => {
    // Toggle between category and transaction
    let label = "View By categories",
      icon = <CategoryIcon />;
    if (viewBy === "category") {
      label = "View By transactions";
      icon = <PaymentIcon />;
    }
    return menuUI({ label: label, clickHandler: handleViewBy, icon: icon });
  };

  const headerMenus = [
    {
      id: 1,
      isIcon: true,
      label: "Open Calendar",
      element: <EventIcon />,
    },
    {
      id: 2,
      isIcon: false,
      element: <ViewBy />,
    },
    {
      id: 3,
      isIcon: true,
      label: "Search your transaction",
      element: <SearchIcon />,
    },
  ];

  //Render UI for mobile menu
  const renderMobileMenu = () => {
    let menus = [
      ...headerMenus,
      {
        id: 4,
        isIcon: false,
        element: menuUI({
          label: "Add Transaction",
          clickHandler: handleOpenAddTransactionDialog,
          icon: <AddIcon />,
        }),
      },
    ];
    return (
      <Menu
        id={mobileMenuId}
        anchorEl={mobileMenuAnchorEl}
        keepMounted
        open={Boolean(mobileMenuAnchorEl)}
        onClose={handleMobileMenuClose}
      >
        {menus &&
          menus.map((menu) => {
            if (menu.isIcon) {
              return (
                <MenuItem key={menu.id}>
                  {menuUI({
                    label: menu.label,
                    clickHandler: null,
                    icon: menu.element,
                  })}
                </MenuItem>
              );
            } else {
              return <MenuItem key={menu.id}>{menu.element}</MenuItem>;
            }
          })}
      </Menu>
    );
  };

  //   Render UI for Desktop header
  const renderDesktopSection = () => {
    let menus = [
      ...headerMenus,
      {
        id: 4,
        isIcon: false,
        element: (
          <Button
            variant="contained"
            color="secondary"
            className={classes.addTransaction}
            startIcon={<AddIcon />}
            onClick={handleOpenAddTransactionDialog}
          >
            Add Transaction
          </Button>
        ),
      },
    ];
    return (
      <>
        <ul className={classes.sectionDesktop}>
          {menus &&
            menus.map((menu) => {
              if (menu.isIcon) {
                return (
                  <li key={menu.id}>
                    {menuUI({
                      label: menu.label,
                      clickHandler: null,
                      icon: menu.element,
                    })}
                  </li>
                );
              } else {
                return <li key={menu.id}>{menu.element}</li>;
              }
            })}
        </ul>
      </>
    );
  };

  //   Render UI for Mobile Header
  const renderMobileSection = (
    <div className={classes.sectionMobile}>
      <Tooltip title="Show more">
        <IconButton
          aria-label="Show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </Tooltip>
    </div>
  );

  return (
    <React.Fragment>
      <Typography variant="h6" className={classes.title} noWrap>
        Wallet Title
      </Typography>
      <div className={classes.grow} />
      {renderDesktopSection()}
      {renderMobileSection}
      {renderMobileMenu()}
      <AddTransactionDialog
        dialogOpen={openAddTransactionDialog}
        showCloseButton={true}
        dialogTitle="Add Transaction"
        handleCloseDialog={handleCloseAddTransactionDialog}
        handleSaveDialog={handleSaveAddTransactionDialog}
        cancelText="Cancel"
        saveText="Save"
      />
    </React.Fragment>
  );
};

export default TransactionHeader;
