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

const ResetPassword = (props) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");

  const { handleSwitchComponent } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [initialScreen, setInitialScreen] = useState(true);
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

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

  const handleSendCode = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    let { fieldName, validateError } = validate({
      email,
    });
    if (validateError === "") {
      try {
        let forgotPasswordResp = await Auth.forgotPassword(email);
        // console.log("forgot password send code", forgotPasswordResp);
        setInitialScreen(false);
        displaySnack("Code sent successfully", "success");
        setSubmitLoading(false);
      } catch (e) {
        if (e.code === "UserNotFoundException") {
          displaySnack("User not found, please sign up!", "error");
        } else {
          // console.log("Error forgot password send code", e.message);
          displaySnack(e.message, "error");
        }
        setSubmitLoading(false);
      }
    } else {
      displaySnack(`Please fill the required field ${fieldName}`, "error");
      setSubmitLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    let { fieldName, validateError } = validate({
      code: verificationCode,
      password: newPassword,
    });
    if (validateError === "") {
      try {
        let forgotPasswordSubmit = await Auth.forgotPasswordSubmit(
          email,
          verificationCode,
          newPassword
        );
        // console.log("forgot password submit", forgotPasswordSubmit);
        handleSwitchComponent("SignIn");
        displaySnack(
          "Your password has been resetted successfully! Please Sign in to proceed",
          "success"
        );
        setSubmitLoading(false);
      } catch (e) {
        // console.log("Error forgotPasswordSubmit", e.message, e.code);
        displaySnack(e.message, "error");
        setSubmitLoading(false);
      }
    } else {
      displaySnack(`Please fill the required field ${fieldName}`, "error");
      setSubmitLoading(false);
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
                Reset Password
              </Typography>
            </Box>
            <form className={classes.form}>
              {initialScreen ? (
                <TextField
                  variant="outlined"
                  required
                  type="email"
                  margin="normal"
                  label="Email"
                  name="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              ) : (
                <>
                  <TextField
                    label="Verification Code"
                    variant="outlined"
                    required
                    margin="normal"
                    fullWidth
                    name="code"
                    placeholder="Enter code"
                    value={verificationCode}
                    onChange={(e) => {
                      setVerificationCode(e.target.value);
                    }}
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </>
              )}
              {initialScreen ? (
                <ButtonLoader
                  buttonProps={{
                    type: "button",
                    fullWidth: true,
                    variant: "contained",
                    color: "secondary",
                    onClick: (e) => handleSendCode(e),
                  }}
                  className={classes.submit}
                  loading={submitLoading}
                >
                  Send Code
                </ButtonLoader>
              ) : (
                <ButtonLoader
                  buttonProps={{
                    type: "button",
                    fullWidth: true,
                    variant: "contained",
                    color: "secondary",
                    onClick: (e) => handlePasswordChange(e),
                  }}
                  className={classes.submit}
                  loading={submitLoading}
                >
                  Submit
                </ButtonLoader>
              )}
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

export default ResetPassword;
