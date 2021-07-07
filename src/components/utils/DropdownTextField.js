import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles((theme) => ({
  inputField: {
    flex: "1 0 auto",
    marginRight: "20px",
  },

  adornmentIcon: {
    flex: "0 0 auto",
    width: "32px",
    height: "32px",
    // margin: "8px 10px 8px 0px",
    display: "flex",
    alignItems: "center",
  },
}));

const DropdownTextField = (props) => {
  const classes = useStyles();

  const {
    fieldLabel,
    fieldValue,
    setFormFieldValue,
    dialogProps,
    AdornmentIconComponent,
    DefaultAdornmentIcon,
    DialogComponent,
    ...otherProps
  } = props;

  // const [value, setValue] = useState(fieldValue || "");
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = (event) => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveDialog = (value) => {
    setFormFieldValue(value);
    // setValue(value);
    handleCloseDialog();
  };

  return (
    <>
      <TextField
        variant="outlined"
        label={fieldLabel}
        value={fieldValue ? fieldValue.displayName : ""}
        {...otherProps}
        InputProps={{
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start">
              {fieldValue ? (
                <AdornmentIconComponent option={fieldValue} classes={classes} />
              ) : (
                <DefaultAdornmentIcon />
              )}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <KeyboardArrowRightIcon />
            </InputAdornment>
          ),
        }}
        onClick={handleClick}
      />
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

export default DropdownTextField;
