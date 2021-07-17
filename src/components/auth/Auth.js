import React, {
  useMemo,
  useState,
  useEffect,
  useContext,
  createContext,
} from "react";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import VerifyAccount from "./VerifyAccount";
import ResetPassword from "./ResetPassword";

import { Auth } from "aws-amplify";

export const AuthContext = createContext(null);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

// Custom Auth Provider as Parent Component
export const AuthenticationProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = ({ authenticated, userObj }) => {
    // console.log("user auth change----", authenticated, userObj);
    setIsAuthenticated(authenticated);
    setUser(userObj);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      handleAuth,
    }),
    [isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const Authentication = (props) => {
  const [status, setStatus] = useState("");
  const [additionalProps, setAdditionalProps] = useState({});

  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const { isAuthenticated, handleAuth } = useAuthContext();

  const onLoadVerify = async () => {
    try {
      let currentAuthUser = await Auth.currentAuthenticatedUser({
        bypassCache: true, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      });
      debugger;
      let userObj = {
        username: currentAuthUser.username,
        ...currentAuthUser.attributes,
      };
      if (userObj.username) {
        handleAuth({ authenticated: true, userObj: userObj });
        handleSwitchComponent("Authenticated");
        setIsAuthLoading(false);
      }
    } catch (err) {
      // console.log("CurrentAuthenticateduser error---", err);
      handleAuth({ authenticated: false, userObj: null });
      handleSwitchComponent("SignIn");
      setIsAuthLoading(false);
    }
  };

  useEffect(() => {
    onLoadVerify();
  }, []);

  useEffect(() => {
    // console.log(
    //   "change on isAuthenticated and handleAuth",
    //   status,
    //   isAuthenticated
    // );
    if (isAuthenticated) {
      handleSwitchComponent("Authenticated");
    } else {
      handleSwitchComponent("SignIn");
    }
  }, [isAuthenticated]);

  const handleSwitchComponent = (status, additionalAttrs) => {
    setStatus(status);
    setAdditionalProps(additionalAttrs);
  };

  const AuthComponent = () => {
    switch (status) {
      case "SignUp":
        return (
          <SignUp
            handleSwitchComponent={handleSwitchComponent}
            additionalProps={additionalProps}
          />
        );

      case "VerifyAccount":
        return (
          <VerifyAccount
            handleSwitchComponent={handleSwitchComponent}
            additionalProps={additionalProps}
          />
        );

      case "SignIn":
        return (
          <SignIn
            handleSwitchComponent={handleSwitchComponent}
            additionalProps={additionalProps}
          />
        );
      case "ResetPassword":
        return (
          <ResetPassword
            handleSwitchComponent={handleSwitchComponent}
            additionalProps={additionalProps}
          />
        );
      case "Authenticated":
        return props.children;
      default:
        return (
          <SignUp
            handleSwitchComponent={handleSwitchComponent}
            additionalProps={additionalProps}
          />
        );
    }
  };

  return !isAuthLoading && AuthComponent();
};

export default Authentication;
