import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import ImageLoad from "./ImageLoad";

const useStyles = makeStyles((theme) => ({
  iconBox: {
    width: "40px",
    height: "40px",
    borderRadius: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",

    "& img": {
      width: "100%",
    },
  },
}));

const ButtonTextField = (props) => {
  const classes = useStyles();

  const {
    fieldValue,
    setFormFieldValue,
    dialogProps,
    DialogComponent,
    ...otherProps
  } = props;

  // console.log("field Vale ----", fieldValue);

  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = (event) => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveDialog = (value) => {
    setFormFieldValue(value);
    handleCloseDialog();
  };

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        color="default"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        {...otherProps}
      >
        <div className={classes.iconBox}>
          <ImageLoad
            src={fieldValue.img}
            width="100%"
            alt={fieldValue.altName}
          />
          {/* <img src={fieldValue.img} alt={fieldValue.altName} /> */}
        </div>
      </Button>
      {openDialog && (
        <DialogComponent
          dialogOpen={openDialog}
          handleCloseDialog={handleCloseDialog}
          handleSaveDialog={handleSaveDialog}
          {...dialogProps}
        />
      )}
    </>
  );
};

export default ButtonTextField;
