import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";
import Logo from "./Logo";
import { validate } from "../../utils/validators";
import { useSnackbar } from "notistack";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import ButtonLoader from "../utils/ButtonLoader";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    background:
      theme.palette.type === "light" ? "rgb(254,249,215)" : "rgba(3,93,87,1)",
    background:
      theme.palette.type === "light"
        ? "linear-gradient(180deg, rgba(254,249,215,1) 0, rgba(114,204,197,1) 100%)"
        : "linear-gradient(180deg, rgba(13,74,70,1) 0%, rgba(13,133,116,1) 100%)",
  },
  gridContainer: { justifyContent: "center", paddingBottom: "40px" },
  paper: {
    margin: theme.spacing(4, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const VerifyAccount = (props) => {
  const classes = useStyles();

  const { additionalProps, handleSwitchComponent } = props;
  const { email } = additionalProps;

  const [confirmationCode, setConfirmationCode] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [submitLoading, setSubmitLoading] = useState(false);

  const displaySnack = (message, variant) => {
    enqueueSnackbar(message, {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
      variant: variant,
      action: (key) => (
        <IconButton
          disableRipple={true}
          color="inherit"
          size="small"
          onClick={() => closeSnackbar(key)}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      ),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    let { fieldName, validateError } = validate({
      email,
      code: confirmationCode,
    });
    if (validateError === "") {
      try {
        // Optional. Force user confirmation irrespective of existing alias. By default set to True.
        let confirmSignUp = await Auth.confirmSignUp(email, confirmationCode, {
          forceAliasCreation: true,
        });
        // console.log("confirm signup success ----", confirmSignUp);
        handleSwitchComponent("SignIn");
        displaySnack("SignUp is successful! Please sign in", "success");
        setSubmitLoading(false);
      } catch (e) {
        // console.log("confirm signup error", e.message);
        displaySnack(e.message, "error");
        setSubmitLoading(false);
      }
    } else {
      displaySnack(`Please fill the required field ${fieldName}`, "error");
      setSubmitLoading(false);
    }
  };

  const handleResendCode = async () => {
    let { fieldName, validateError } = validate({
      email,
    });
    if (validateError === "") {
      try {
        const code = await Auth.resendSignUp(email);
        // console.log("code resent- ---", code);
        displaySnack("Code resent to your email address", "success");
      } catch (e) {
        // console.log("Error resending", e.message);
        displaySnack(e.message, "error");
      }
    } else {
      displaySnack(`Please fill the required field ${fieldName}`, "error");
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.logo}>
        <Logo />
      </div>
      <Grid container component="main" className={classes.gridContainer}>
        <Grid item xs={12} sm={6} md={4} component={Paper} elevation={6}>
          <div className={classes.paper}>
            <Box display="flex" alignItems="center">
              <Typography component="h1" variant="h6">
                Verify Account
              </Typography>
            </Box>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                required
                margin="normal"
                label="Email"
                type="email"
                name="email"
                fullWidth
                value={email}
                readOnly
              />
              <TextField
                label="Confirmation Code"
                variant="outlined"
                required
                margin="normal"
                fullWidth
                placeholder="Enter your code"
                value={confirmationCode}
                onChange={(e) => {
                  setConfirmationCode(e.target.value);
                }}
                autoFocus
              />

              <Grid container>
                <Grid item>
                  Lost your code?
                  <Link
                    href="#"
                    variant="body2"
                    onClick={(e) => {
                      e.preventDefault();
                      handleResendCode();
                    }}
                  >
                    Resend Code
                  </Link>
                </Grid>
              </Grid>
              <ButtonLoader
                buttonProps={{
                  type: "submit",
                  fullWidth: true,
                  variant: "contained",
                  color: "secondary",
                }}
                className={classes.submit}
                loading={submitLoading}
              >
                Confirm
              </ButtonLoader>
              <Grid container justify="center">
                <Grid item>
                  <Link
                    href="/"
                    variant="body2"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSwitchComponent("SignIn");
                    }}
                  >
                    Back to Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default VerifyAccount;
