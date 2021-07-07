import React, { useState, forwardRef } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";

import AddCategoryDialog from "../../modal/forms/AddCategory";

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
      display: "flex",
      margin: 0,
      listStyle: "none",
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
  // console.log("category header props", props);

  const classes = useStyles();

  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);

  const handleOpenAddCategoryDialog = () => {
    setOpenAddCategoryDialog(true);
  };

  const handleCloseAddCategoryDialog = () => {
    setOpenAddCategoryDialog(false);
  };

  const handleSaveAddCategoryDialog = () => {
    handleCloseAddCategoryDialog();
  };

  //   Render UI for Desktop header
  const renderDesktopSection = () => {
    let menus = [
      {
        id: 1,
        isIcon: false,
        element: (
          <Button
            variant="contained"
            color="secondary"
            className={classes.addTransaction}
            onClick={handleOpenAddCategoryDialog}
          >
            Add Category
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

  return (
    <React.Fragment>
      <Typography variant="h6" className={classes.title} noWrap>
        Categories
      </Typography>
      <div className={classes.grow} />
      {renderDesktopSection()}
      <AddCategoryDialog
        dialogOpen={openAddCategoryDialog}
        dialogTitle="Add Category"
        disableSaveOnOpen={true}
        handleCloseDialog={handleCloseAddCategoryDialog}
        handleSaveDialog={handleSaveAddCategoryDialog}
        showCloseButton={true}
        saveText="Save"
        cancelText="Cancel"
      />
    </React.Fragment>
  );
};

export default TransactionHeader;
