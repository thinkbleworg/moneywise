import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "./Auth";

const useStyles = makeStyles((theme) => ({}));

const SignOut = (props) => {
  const classes = useStyles();
  const { handleAuth } = useAuthContext();
  const history = useHistory();
  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      //  await Auth.signOut({ global: true }); Signout from all devices
      let signout = await Auth.signOut();
      // console.log("signout success---", signout);
      handleAuth({ authenticated: false, userObj: "" });
      history.push("/");
    } catch (e) {
      // console.log("signout error", e);
    }
  };

  return <Button onClick={handleSignOut}>SignOut</Button>;
};

export default SignOut;
