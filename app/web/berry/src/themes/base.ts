import React from "react";

import { Theme } from "@mui/material";
import PureLightTheme from ".";

export function themeCreator(theme: string): Theme {
  return themeMap[theme];
}

declare module "@mui/material/styles" {
  interface Theme {
    palette: {
      mode: any;
      common: {
        black: any;
      };
      primary: {
        light: any;
        main: any;
        dark: any;
        200: any;
        800: any;
      };
      secondary: {
        light: any;
        main: any;
        dark: any;
        200: any;
        800: any;
      };

      error: {
        light: any;
        main: any;
        dark: any;
      };
      orange: {
        light: any;
        main: any;
        dark: any;
      };
      warning: {
        light: any;
        main: any;
        dark: any;
      };
      success: {
        light: any;
        200: any;
        main: any;
        dark: any;
      };
      grey: {
        50: any;
        100: any;
        500: any;
        600: any;
        700: any;
        900: any;
      };
      dark: {
        light: any;
        main: any;
        dark: any;
        800: any;
        900: any;
      };
      text: {
        primary: any;
        secondary: any;
        dark: any;
        hint: any;
      };
      background: {
        paper: any;
        default: any;
      };
    };
  }
}
const themeMap: { [key: string]: Theme } = {
  PureLightTheme,
};
