import { responsiveFontSizes } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import shadows from "./shadows";
import palette from "./palette-main";

const getTheme = (mode, paletteType) => {
  const theme = responsiveFontSizes(
    createTheme({
      palette: palette(mode, paletteType),
      layout: {
        contentWidth: 1236,
      },
      shadows: shadows(mode),
      typography: {
        fontFamily: '"Inter", sans-serif',
        button: {
          textTransform: "none",
          fontWeight: "medium",
        },
      },
      zIndex: {
        appBar: 1200,
        drawer: 1300,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            label: {
              fontWeight: 600,
            },
            containedSecondary: mode === "light" ? { color: "white" } : {},
          },
        },
      },
      mainGradient: {
        prop: "linear-gradient(90deg, rgba(253,29,29,1) 0%, rgba(248,72,58,0.9166666666666666) 49%, rgba(252,176,69,1) 100%)",
        // backgroundImage:
        //   ,
        // backgroundColor: "#f3ec78",
      },
      textGradient: {
        "-webkit-background-clip": "text",
        "-moz-background-clip": "text",
        "-webkit-text-fill-color": "transparent",
        "-moz-text-fill-color": "transparent",
      },
    })
  );

  return theme;
};

export default getTheme;
