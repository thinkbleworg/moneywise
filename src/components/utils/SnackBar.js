import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Snackbar = (props) => {
  const classes = useStyles();
  const { message } = props;
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState("default");
  const [showCloseButton, setShowCloseButton] = useState(
    props.showCloseButton || true
  );
  const [enableAutoHide, setEnableAutoHide] = useState(false);
  const [position, setPosition] = useState({
    vertical: "bottom",
    horizontal: "center",
  });

  const closeButtonUI = () => (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const handleClose = (event) => {
    setOpen(false);
  };

  useEffect(() => {
    if (props.position.hasOwnProperty("vertical")) {
      setPosition(props.position);
    }
  }, [props.position]);

  useEffect(() => {
    setEnableAutoHide(true);
  }, [props.enableAutoHide]);

  useEffect(() => {
    setVariant(props.variant);
  }, [props.variant]);

  return (
    <div>
      {variant === "default" ? (
        <Snackbar
          anchorOrigin={position}
          open={open}
          autoHideDuration={enableAutoHide ? 6000 : null}
          onClose={handleClose}
          message={message || "Default Snackbar "}
          action={showCloseButton && closeButtonUI()}
        />
      ) : (
        <Snackbar
          anchorOrigin={position}
          open={open}
          autoHideDuration={enableAutoHide ? 6000 : null}
          onClose={handleClose}
          action={showCloseButton && closeButtonUI()}
        >
          <Alert onClose={handleClose} severity={variant}>
            {message || "Default Snackbar "}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

const SnackBarQueue = (props) => {
  const [snackBarArray, setSetSnackBarArray] = useState([]);
  const [maxCount, setMaxCount] = useState(props.maxCount || 3);

  return "";
};
