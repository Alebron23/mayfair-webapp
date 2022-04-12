import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Skeleton from "@mui/material/Skeleton";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { GradientButton } from "../common/Buttons";

// reducer imports
import { selectIsAuthed } from "../../store/auth/reducer";
import { addNotif } from "../../store/notifications/actions";

// component imports
import Pic from "./Pic";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      borderRadius: 15,
      boxSizing: "border-box",
      height: "100%",
      position: "relative",

      backgroundColor: "#f0f4f5", // #f0f3f5 #cededf  #f0f4f5 #ffffff
      boxShadow: `15px 15px 20px #cfcfd1,
        -15px -15px 20px #ffffff`,
    },
    imgContainer: {
      width: "100%",
      borderRadius: 15,
      "&:hover": {
        cursor: "pointer",
      },
    },
    vehiclePic: {
      width: "100%",
      height: "auto",
      borderRadius: "20px 20px 0 0 ",
      "&:hover": {
        cursor: "pointer",
      },
    },
    info: {
      width: "100%",
      padding: 16,
      borderRadius: "0 0 20px 20px",
      borderTop: "none",
      boxSizing: "border-box",

      "&:hover": {
        cursor: "pointer",
      },
    },
    price: {
      marginTop: 4,
      fontSize: "1.3rem",
      color: "#575f65",
      fontWeight: 500,
      marginBottom: theme.spacing(1),
    },
    blueText: {
      color: "#1773ce",
      fontSize: "1rem",
    },
    payments: {
      marginTop: theme.spacing(1),
      fontSize: ".8rem",
    },
    paymentsSpan: {
      position: "relative",
    },
    infoIcon: {
      fontSize: ".7rem",
      position: "absolute",
      right: -theme.spacing(2),
      top: "50%",
      transform: "translateY(-50%)",
    },
    sold: {
      color: "red",
      fontWeight: "bold",
      marginLeft: theme.spacing(4),
    },
  })
);

// NOTE: Had to fix authentication issue with the session by using axios instead of the base Fetch
// method that rtk query comes with.
const ListItem = React.memo(
  ({ vehicle = {}, isAuthed, isLoading, addNotification }) => {
    const classes = useStyles();
    let history = useHistory();
    const { picIds } = vehicle;
    const price = Number.parseFloat(vehicle.price.replace(/,/g, ""), 10);
    const payments = Math.floor(price / 60 + 40);

    return (
      <Grid item xs={12} md={6} style={{ padding: 8 }}>
        <div
          className={classes.root}
          onClick={() => {
            if (isAuthed) history.push(`/edit/${vehicle._id}`);
            else history.push(`/vehicle/${vehicle._id}`);
          }}
        >
          <div className={classes.imgContainer}>
            <Pic id={picIds[0]} isLoading={isLoading} />
          </div>

          <Paper elevation={1} className={classes.info}>
            {isLoading ? (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton width="60%" />
              </>
            ) : (
              <>
                <Grid
                  container
                  direction="row"
                  justifyContent={"space-between"}
                >
                  <Grid item xs={8}>
                    <div className={classes.blueText}>
                      {`${vehicle.year} ${vehicle.make}`} {`${vehicle.model}`}
                    </div>
                    <div className={classes.price}>
                      <span>{`$${(vehicle.price * 1).toLocaleString(
                        "en-US"
                      )}`}</span>{" "}
                      ·{" "}
                      <span>{`${(vehicle.mileage * 1).toLocaleString(
                        "en-US"
                      )} miles`}</span>
                    </div>
                  </Grid>

                  <GradientButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      addNotification(
                        "crypto",
                        "Crypto Payments Coming Soon...",
                        "attention"
                      );
                    }}
                    sx={{
                      display: "block",
                      marginLeft: "auto",
                    }}
                  >
                    Buy
                  </GradientButton>
                  <Grid item xs={4}></Grid>
                </Grid>
                <Divider />
                <div className={classes.payments}>
                  <span className={classes.paymentsSpan}>
                    Est. ${payments}/month
                  </span>
                </div>{" "}
              </>
            )}
          </Paper>
        </div>
      </Grid>
    );
  }
);

const mapStateToProps = (state) => {
  return {
    isAuthed: selectIsAuthed(state),
  };
};

const ListItemWrapper = connect(mapStateToProps, { addNotification: addNotif })(
  ListItem
);

export default ListItemWrapper;
