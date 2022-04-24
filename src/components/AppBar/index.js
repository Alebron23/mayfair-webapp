import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Grid from "@material-ui/core/Grid";
import { useHistory, useLocation } from "react-router-dom";

// Images
import Logo from "../../imgs/logoTransparent.png";
import MayfairMap from "../../imgs/mayfairmap.png";

// Redux
import { addNotif } from "../../store/notifications/actions";
import { setIsAuthed } from "../../store/auth/reducer";
import { selectIsAuthed } from "../../store/auth/reducer";

// User Imports
import SearchField from "./SearchFields";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: "0 auto",
      maxWidth: 1200,
      padding: 16,
    },
    gridContainer: {},
    logoImg: {
      width: 23,
      height: 23,
      marginRight: theme.spacing(1),

      "&:hover": {
        cursor: "pointer",
      },
    },
    title: {
      "&:hover": {
        cursor: "pointer",
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
      "@media only screen and (max-width: 600px)": {
        display: "none",
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
    fullList: {
      width: "auto",
    },
  })
);

function ButtonAppBar({ handleDrawerChange }) {
  const classes = useStyles();
  let history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  const pathname = location.pathname;

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root} style={{}}>
      <Grid
        className={classes.gridContainer}
        container
        alignItems="center"
        style={
          {
            // paddingRight: pathname === "/" ? "16px" : 0,
          }
        }
      >
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
          variant="h5"
          className={classes.title}
          onClick={() => history.push("/")}
        >
          Mayfair Motors
        </Typography>
        <div className={classes.location}>
          <span>Roebuck, SC</span>
          <ArrowDropDownIcon
            className={classes.downArrow}
            onClick={anchorEl ? handlePopoverClose : handlePopoverOpen}
          />

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
                  <a className={classes.phoneNumber} href="tel:+1-864-804-7528">
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

        {pathname === "/" && <SearchField />}
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthed: selectIsAuthed(state),
  };
};

const AppWrapper = connect(mapStateToProps, {
  addNotification: addNotif,
  setIsAuthed,
})(ButtonAppBar);

export default AppWrapper;
