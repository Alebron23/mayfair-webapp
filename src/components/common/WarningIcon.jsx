import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import WarningIcon from "@material-ui/icons/Warning";

const useStyles = makeStyles((theme) =>
  createStyles({
    loadingContainer: {
      width: "100%",
    },
    imgSpinner: {
      width: "50px !important",
      height: "initial !important",
    },
    warningIcon: {
      width: 50,
      height: 50,
    },
    warningText: {
      marginTop: theme.spacing(3),
      fontSize: theme.spacing(2.5),
    },
  })
);

export default function WarningIconContainer() {
  const classes = useStyles();

  return (
    <Grid
      className={classes.loadingContainer}
      container
      alignItems="center"
      justify="center"
      direction="column"
    >
      <WarningIcon className={classes.warningIcon} />
      <span className={classes.warningText}>Image Failed to Load</span>
    </Grid>
  );
}
