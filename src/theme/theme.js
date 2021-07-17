import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

export const DarkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#11bba3",
      contrastText: "#fff",
    },
    secondary: {
      main: "#fb8c00",
      contrastText: "#fff",
    },
  },
});

export const LightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#198a82",
      contrastText: "#fff",
    },
    secondary: {
      main: "#fb8c00",
      contrastText: "#fff",
    },
  },
});
