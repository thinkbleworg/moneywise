import React, { useContext } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { CustomThemeContext } from "../../theme/ThemeProvider";
import ImageLoad from "../utils/ImageLoad";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "15px",
    paddingBottom: "15px",
  },
  imageBox: {
    width: "180px",
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("sm")]: {
      width: "150px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100px",
    },
  },
}));

const Logo = () => {
  const classes = useStyles();
  const { currentTheme } = useContext(CustomThemeContext);
  const logoImg = Boolean(currentTheme === "dark")
    ? "titlelogo512dark.png"
    : "titlelogo512.png";
  return (
    <Box className={classes.root}>
      <div className={classes.imageBox}>
        <ImageLoad src={logoImg} width="100%" alt="Moneywise" />
      </div>
    </Box>
  );
};

export default Logo;
