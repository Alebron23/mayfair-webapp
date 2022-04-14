import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Divider from "@mui/material/Divider";
import AppBar from "../components/AppBar";
import Slide from "@mui/material/Slide";

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
    <div style={{ maxWidth: 1200, padding: "0 8px", margin: "0 auto" }}>
      {/* <HideOnScroll>
        
      </HideOnScroll> */}
      <AppBar handleDrawerChange={handleDrawerChange} />
      <Drawer open={drawerOpen} handleDrawerChange={handleDrawerChange} />
      <main>{children}</main>
    </div>
  );
};

export default Main;
