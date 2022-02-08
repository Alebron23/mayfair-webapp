import React from "react";
import axios from "axios";
import { createStyles, makeStyles, fade } from "@material-ui/core/styles";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import InputBase from "@material-ui/core/InputBase";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CarIcon from "@material-ui/icons/DirectionsCar";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitIcon from "@material-ui/icons/ExitToApp";

// import PaymentIcon from "@material-ui/icons/Payment";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import _debounce from "lodash/debounce";
import { useHistory, useLocation } from "react-router-dom";

import Logo from "../../imgs/logoTransparent.png";
import MayfairMap from "../../imgs/mayfairmap.png";
import { setSearching } from "../../store/vehicles/actions";
import { addNotif } from "../../store/notifications/actions";
import { setIsAuthed } from "../../store/auth/reducer";
import { selectVehicleSearch } from "../../store/vehicles/selectors";
import { selectIsAuthed } from "../../store/auth/reducer";
import { baseEndpoint } from "../../store/services/api";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      // marginRight: theme.spacing(0.5),
    },
    logoImg: {
      width: 25,
      height: 25,
      marginRight: theme.spacing(1),

      "&:hover": {
        cursor: "pointer",
      },
    },
    title: {
      display: "none",

      "&:hover": {
        cursor: "pointer",
      },
      "@media only screen and (min-width: 750px)": {
        display: "initial",
      },
    },
    location: {
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
      marginLeft: "auto",

      "@media only screen and (min-width: 750px)": {
        marginRight: theme.spacing(2),
      },
    },
    downArrow: {
      fontSize: "2rem",

      "&:hover": {
        cursor: "pointer",
      },
    },
    popoverTitleContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: theme.spacing(1),
    },
    popoverTitle: {
      margin: 0,
    },
    locationIcon: {
      fontSize: "1rem",
    },
    phoneNumber: {
      display: "block",
      color: theme.palette.info.light,
      textDecoration: "underline",

      marginTop: theme.spacing(1),
    },
    imgLink: {
      marginLeft: 16,
    },
    mapImg: {
      width: 80,
      height: "100%",
      borderRadius: 5,
    },
    paper: {
      padding: theme.spacing(1),
      width: 300,
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },

      "@media only screen and (max-width: 600px)": {
        display: "none",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
    drawer: {
      width: 250,
      height: "100%",
      position: "relative",
    },
    fullList: {
      width: "auto",
    },
    adminItem: {
      position: "absolute",
      bottom: 0,
    },
  })
);

function ButtonAppBar({
  searching,
  setSearching,
  addNotification,
  setIsAuthed,
  isAuthed,
}) {
  const classes = useStyles();
  let history = useHistory();
  const [searchText, setSearchText] = React.useState("");
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  const pathname = location.pathname;

  const handleLogout = async () => {
    try {
      await axios.get(`${baseEndpoint}/users/logout`, {
        withCredentials: true,
      });
      setIsAuthed(false);
      addNotification("logout", "Successful Log Out", "success");
    } catch (err) {
      console.log("logout error:", err);
      addNotification("logout", "Error Logging Out", "error");
    }
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const debounceHandler = React.useCallback(
    _debounce((value) => {
      setSearching(false);
    }, 1000),
    []
  );

  const handleChange = React.useCallback(
    (e) => {
      setSearchText(e.target.value);

      if (!searching) {
        setSearching(true);
      }

      debounceHandler(e.target.value);
    },
    [searching, setSearching, debounceHandler]
  );

  const handleDrawerChange = () => setDrawerOpen(!drawerOpen);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerChange}
          >
            <MenuIcon />
          </IconButton>
          <img
            src={Logo}
            alt="Mayfair Motors Logo"
            className={classes.logoImg}
            onClick={() => history.push("/")}
          />
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => history.push("/")}
          >
            Mayfair Motors
          </Typography>
          <div
            className={classes.location}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <span>Roebuck, SC</span>
            <ArrowDropDownIcon className={classes.downArrow} />

            <Popper id={id} open={open} anchorEl={anchorEl}>
              <Paper style={{ padding: 16 }}>
                <Grid container justify="space-between">
                  <div>
                    <span className={classes.popoverTitleContainer}>
                      <h3 className={classes.popoverTitle}>Roebuck, SC</h3>
                      <LocationOnIcon className={classes.locationIcon} />
                    </span>
                    <div>161 Wingo Rd</div>
                    <div>Roebuck, SC 29376</div>
                    <a
                      className={classes.phoneNumber}
                      href="tel:+1-864-804-7528"
                    >
                      Call: 864-804-7528
                    </a>
                  </div>
                  <a
                    href="https://goo.gl/maps/AHxoiZ2G1G6oZBxKA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.imgLink}
                  >
                    <img
                      src={MayfairMap}
                      className={classes.mapImg}
                      alt="Mayfair Motors Logo"
                    />
                  </a>
                </Grid>
              </Paper>
            </Popper>
          </div>

          {pathname === "/" && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={handleChange}
                value={searchText}
              />
            </div>
          )}

          <SwipeableDrawer
            anchor="left"
            open={drawerOpen}
            onClose={handleDrawerChange}
            onOpen={handleDrawerChange}
          >
            <List className={classes.drawer}>
              <ListItem
                button
                key={"Vehicles"}
                onClick={() => {
                  history.push("/");
                  handleDrawerChange();
                }}
              >
                <ListItemIcon>
                  <CarIcon />
                </ListItemIcon>
                <ListItemText primary="Vehicles" />
              </ListItem>

              <ListItem
                button
                component="a"
                key="creditApp"
                onClick={() => {
                  history.push("/credit-app");
                  handleDrawerChange();
                }}
              >
                <ListItemIcon>
                  <AccountBalanceIcon />
                </ListItemIcon>
                <ListItemText primary={"Credit Application"} />
              </ListItem>
              <ListItem
                button
                key={"Info"}
                onClick={() => {
                  history.push("/info");
                  handleDrawerChange();
                }}
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Info" />
              </ListItem>
              <Divider />
              {!isAuthed && (
                <ListItem
                  button
                  key={"Admin"}
                  onClick={() => {
                    history.push("/login");
                    handleDrawerChange();
                  }}
                  className={classes.adminItem}
                >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Admin" />
                </ListItem>
              )}

              {isAuthed && (
                <ListItem
                  button
                  key={"Logout"}
                  onClick={() => {
                    handleLogout();
                    handleDrawerChange();
                    history.push("/");
                  }}
                  className={classes.adminItem}
                >
                  <ListItemIcon>
                    <ExitIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              )}
            </List>
          </SwipeableDrawer>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    searching: selectVehicleSearch(state),
    isAuthed: selectIsAuthed(state),
  };
};

const AppWrapper = connect(mapStateToProps, {
  addNotification: addNotif,
  setSearching,
  setIsAuthed,
})(ButtonAppBar);

export default AppWrapper;
