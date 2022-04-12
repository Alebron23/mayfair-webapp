import React from "react";
import axios from "axios";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
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
import { useHistory } from "react-router-dom";

import { addNotif } from "../../store/notifications/actions";
import { setIsAuthed } from "../../store/auth/reducer";
import { selectIsAuthed } from "../../store/auth/reducer";
import { baseEndpoint } from "../../store/services/api";

const useStyles = makeStyles((theme) =>
  createStyles({
    drawer: {
      width: 250,
      height: "100%",
      position: "relative",
    },
    adminItem: {
      position: "absolute",
      bottom: 0,
    },
  })
);

function Drawer({
  addNotification,
  setIsAuthed,
  isAuthed,
  open,
  handleDrawerChange,
}) {
  const classes = useStyles();
  let history = useHistory();

  const handleLogout = async () => {
    try {
      await axios.get(`${baseEndpoint}/users/logout`, {
        withCredentials: true,
      });
      setIsAuthed(false);
      addNotification("logout", "Successful Log Out", "success");
    } catch (err) {
      addNotification("logout", "Error Logging Out", "error");
    }
  };

  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
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
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthed: selectIsAuthed(state),
  };
};

const DrawerWrapper = connect(mapStateToProps, {
  addNotification: addNotif,
  setIsAuthed,
})(Drawer);

export default DrawerWrapper;
