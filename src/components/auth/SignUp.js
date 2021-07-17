import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Logo from "./Logo";
import { Auth } from "aws-amplify";
import { validate } from "../../utils/validators";
import { useSnackbar } from "notistack";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

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
  container: {
    paddingBottom: "40px",
    paddingLeft: 0,
    paddingRight: 0,
  },
  paper: {
    padding: theme.spacing(4, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = (props) => {
  const classes = useStyles();

  const { handleSwitchComponent } = props;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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
      firstName,
      lastName,
      email,
      password,
    });
    if (validateError === "") {
      try {
        let signUp = await Auth.signUp({
          username: email,
          password,
          attributes: {
            email: email, // optional,
            name: lastName + " " + firstName,
            // phone_number // optional - E.164 number convention
            // other custom attributes
          },
          validationData: [], //optional
        });
        // console.log("signup success --- ", signUp);
        displaySnack(
          "Signing up is successful, please verify your email address!",
          "success"
        );
        handleSwitchComponent("VerifyAccount", { email: email });
      } catch (e) {
        displaySnack(e.message, "error");
        // console.log("signup error", e.message);
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
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Paper elevation={6} className={classes.paper}>
          <Typography component="h1" variant="h6">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Sign Up
            </Button>
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
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};
export default SignUp;
