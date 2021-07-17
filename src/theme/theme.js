import { createMuiTheme } from "@material-ui/core/styles";

// Colors
// f4f3ec - Light white
// fef9d7 - Light Yellow white
// 72ccc5 - Light Blue
// 198a82 - Teal Blue
// 11bba3 - Teal green
// ffc552- Light orange
// fc9c47 - dark orange
// fb8c00 - contrast orange

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
