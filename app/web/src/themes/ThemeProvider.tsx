import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeCreator } from "./base";
import { useSelector } from "react-redux";

import { StyledEngineProvider } from "@mui/material/styles";
import { ThemeOptions } from "@mui/material/styles";

const ThemeProviderWrapper: React.FC<{ children: JSX.Element }> = (props) => {
  const curThemeName = localStorage.getItem("appTheme") || "PureLightTheme";

  // themes(customization)
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    localStorage.setItem("appTheme", themeName);
    _setThemeName(themeName);
  };

  return (
    <StyledEngineProvider injectFirst>
      {/* <ThemeContext.Provider value={setThemeName}> */}
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      {/* </ThemeContext.Provider> */}
    </StyledEngineProvider>
  );
};

export default ThemeProviderWrapper;
