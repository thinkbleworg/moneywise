import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "./Auth";

import ButtonLoader from "../utils/ButtonLoader";

const useStyles = makeStyles((theme) => ({}));

const SignOut = (props) => {
  const classes = useStyles();
  const { handleAuth } = useAuthContext();
  const history = useHistory();
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleSignOut = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      //  await Auth.signOut({ global: true }); Signout from all devices
      let signout = await Auth.signOut();
      // console.log("signout success---", signout);
      handleAuth({ authenticated: false, userObj: "" });
      history.push("/");
      setSubmitLoading(false);
    } catch (e) {
      // console.log("signout error", e);
      setSubmitLoading(false);
    }
  };

  return (
    <ButtonLoader
      buttonProps={{
        color: "secondary",
        onClick: (e) => handleSignOut(e),
      }}
      className={classes.submit}
      loading={submitLoading}
    >
      SignOut
    </ButtonLoader>
  );
};

export default SignOut;
