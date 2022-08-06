import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Divider from "@mui/material/Divider";
import AppBar from "../components/AppBar";
import Slide from "@mui/material/Slide";
import Footer from "../components/Footer";
import Box from "@mui/material/Box";

//UserImports
import Drawer from "../components/AppBar/Drawer";

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();
  console.log(trigger);
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const Main = ({
  children,
  themeToggler,
  themeMode,
  setThemePalette,
  paletteType,
}) => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerChange = () => setDrawerOpen(!drawerOpen);

  return (
    <div style={{}}>
      <AppBar handleDrawerChange={handleDrawerChange} />
      <Drawer open={drawerOpen} handleDrawerChange={handleDrawerChange} />
      <main
        style={{
          minHeight: "100vh",
          maxWidth: 1200,
          margin: "0 auto 32px auto",
          padding: "0 16px",
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Main;
