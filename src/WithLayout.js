import React, { useEffect, useState } from "react";

import palettes from "./components/common/paletteTypes";
// import PropTypes from 'prop-types';
import { ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import getTheme from "./theme";

export const useMode = () => {
  const [themeMode, setTheme] = useState("light");
  const [paletteType, setPalette] = useState(palettes[0]);
  const [mountedComponent, setMountedComponent] = useState(false);

  const setMode = (mode) => {
    window.localStorage.setItem("themeMode", mode);
    setTheme(mode);
  };

  const setThemePalette = (type = "grey") => {
    const palette = palettes.indexOf(type) === -1 ? "grey" : type;
    window.localStorage.setItem("themePalette", palette);
    setPalette(palette);
  };

  const themeToggler = () => {
    themeMode === "light" ? setMode("dark") : setMode("light");
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("themeMode");
    localTheme ? setTheme(localTheme) : setMode("light");
    const localPalette = window.localStorage.getItem("themePalette");
    localPalette ? setPalette(localPalette) : setThemePalette("green");
    setMountedComponent(true);
  }, []);

  return [
    themeMode,
    themeToggler,
    paletteType,
    setThemePalette,
    mountedComponent,
  ];
};

export default function WithLayout({
  component: Component,
  layout: Layout,
  ...rest
}) {
  const [themeMode, themeToggler, paletteType, setThemePalette] = useMode();
  const theme = getTheme(themeMode, paletteType);
  console.log("THEME 2:", theme);
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon */}
      <CssBaseline />

      <Paper elevation={0}>
        <Layout
          themeMode={themeMode}
          themeToggler={themeToggler}
          paletteType={paletteType}
          setThemePalette={setThemePalette}
        >
          <Component
            themeMode={themeMode}
            paletteType={paletteType}
            {...rest}
          />
        </Layout>
      </Paper>
    </ThemeProvider>
  );
}
