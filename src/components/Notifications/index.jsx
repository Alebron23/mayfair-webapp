import React from "react";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { removeNotif } from "../../store/notifications/actions";
import { selectAllNotifs } from "../../store/notifications/selectors";
import IconTypes from "./IconTypes";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
    },
    iconSpan: {
      display: "flex",
      alignItems: "center",
    },
  })
);

function SimpleSnackbar({ notifs, removeNotification }) {
  const classes = useStyles();
  let Icon;

  const handleClose = (_event, reason, id) => {
    if (reason === "clickaway") {
      return;
    }

    removeNotification(id);
  };

  return (
    <div>
      {Boolean(notifs.length) &&
        notifs.map((notif, index) => {
          Icon = IconTypes[notif.type];

          return (
            <Snackbar
              key={index}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              style={{
                marginBottom: index * 60,
              }}
              open
              autoHideDuration={6000}
              onClose={(e, r) => handleClose(e, r, notif.id)}
              message={
                <span className={classes.iconSpan}>
                  <Icon />
                  {notif.message}
                </span>
              }
              action={
                <React.Fragment>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={(e, r) => handleClose(e, r, notif.id)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
          );
        })}
    </div>
  );
}

const mapStateToProps = (state) => ({
  notifs: selectAllNotifs(state),
});

const SnackbarWrap = connect(mapStateToProps, {
  removeNotification: removeNotif,
})(SimpleSnackbar);

export default SnackbarWrap;
