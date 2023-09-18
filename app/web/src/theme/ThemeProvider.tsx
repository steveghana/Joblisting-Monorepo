import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { themeCreator } from "./base";
import { StylesProvider } from "@mui/styles";
import { ThemeOptions } from "@mui/material/styles";

export const ThemeContext = React.createContext(
  (themeName: string): void => {}
);
type CustomTheme = Omit<
  ThemeOptions,
  "colors" | "general" | "sidebar" | "header"
>;

const custom: CustomTheme = {
  typography: {
    h3: {
      fontFamily: ["Didact Gothic"].join(","),
    },
    h5: {
      fontFamily: ["Didact Gothic"].join(","),
    },
    body1: {
      fontFamily: ["Poppins"].join(","),
    },
    body2: {
      fontFamily: ["Lato"].join(","),
    },
    button: {
      fontFamily: ["Poppins"].join(","),
    },
    caption: {
      fontFamily: ["Lato"].join(","),
    },
  },
  // You can include other properties here if needed
};
//@ts-ignore
const defaultTheme = createTheme(custom);

const ThemeProviderWrapper: React.FC<{ children: JSX.Element }> = (props) => {
  const curThemeName = localStorage.getItem("appTheme") || "PureLightTheme";
  const [themeName, _setThemeName] = useState(curThemeName);
  // const theme = themeCreator(themeName);
  // const setThemeName = (themeName: string): void => {
  //   localStorage.setItem("appTheme", themeName);
  //   _setThemeName(themeName);
  // };

  return (
    // <StylesProvider injectFirst>
    <ThemeProvider theme={defaultTheme}>{props.children}</ThemeProvider>
    // </StylesProvider>
  );
};

export default ThemeProviderWrapper;
