import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import Logo from "./Logo";
import { validate } from "../../utils/validators";

import { useSnackbar } from "notistack";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { useAuthContext } from "./Auth";

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

const SignIn = (props) => {
  const classes = useStyles();

  const { handleSwitchComponent } = props;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { handleAuth } = useAuthContext();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    let { fieldName, validateError } = validate({
      email,
      password,
    });
    if (validateError === "") {
      try {
        const user = await Auth.signIn(email, password);
        // console.log("Logged in --- user", user);
        handleAuth({ authenticated: true, userObj: user });
        handleSwitchComponent("Authenticated");
        history.push("/");
      } catch (e) {
        if (e.code === "UserNotConfirmedException") {
          const resendSignUp = await Auth.resendSignUp(email);
          // console.log("code resendSignUp from Signin- ---", resendSignUp);
          handleSwitchComponent("VerifyAccount", { email: email });
          displaySnack("Please verify your account!", "error");
        } else {
          //err.code === 'NotAuthorizedException' || err.code === 'UserNotFoundException' || other errors
          // console.log("Error signin", e.message);
          displaySnack(e.message, "error");
        }
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
                Sign In
              </Typography>
            </Box>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="email"
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="/"
                    variant="body2"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSwitchComponent("ResetPassword");
                    }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="/"
                    variant="body2"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSwitchComponent("SignUp");
                    }}
                  >
                    {"Don't have an account? Sign Up"}
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

export default SignIn;
