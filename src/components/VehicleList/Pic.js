import React, { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import WarningIcon from "@material-ui/icons/Warning";

import { baseEndpoint } from "../../store/services/api";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
      overflow: "hidden",
      position: "relative",
      paddingTop: "55%",
    },
    pic: {
      width: "100%",
      height: "auto",
      position: "absolute",
      top: 0,
    },
    warningMsg: {
      position: "absolute",
      top: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    warningIcon: {
      width: 50,
      height: 50,
    },
    warningText: {
      marginTop: theme.spacing(3),
      fontSize: theme.spacing(2.5),
    },
    circularContainer: {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
    },
    imgSpinner: {
      width: "50px !important",
      height: "50px !important",
    },
  })
);

function Pic({ id }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [hasErrored, setHasErrored] = useState(false);

  return (
    <Grid
      className={classes.root}
      container
      alignItems="center"
      justify="center"
    >
      {hasErrored ? (
        <div className={classes.warningMsg}>
          <WarningIcon className={classes.warningIcon} />
          <span className={classes.warningText}>Image Failed to Load</span>
        </div>
      ) : (
        id && (
          <img
            className={classes.pic}
            src={`${baseEndpoint}/vehicles/pics/${id}`}
            alt="vehicle"
            onLoad={() => setLoading(false)}
            width={600}
            height={400}
            onError={() => {
              setHasErrored(true);
              setLoading(false);
            }}
          />
        )
      )}

      {loading && (
        <Grid
          container
          alignItems="center"
          justify="center"
          className={classes.circularContainer}
        >
          <CircularProgress className={classes.imgSpinner} />
        </Grid>
      )}
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const PicWrapper = connect(mapStateToProps, {})(Pic);

export default PicWrapper;
