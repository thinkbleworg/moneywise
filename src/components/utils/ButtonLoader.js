import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
  },
  buttonProgress: {
    color: "inherit",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const ButtonLoader = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Button
        className={props.className}
        disabled={props.loading}
        {...props.buttonProps}
      >
        {props.children}
        {props.loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </Button>
    </div>
  );
};

export default ButtonLoader;
