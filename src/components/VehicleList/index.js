import React from "react";
import { useHistory } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import HelmetWrapper from "../HelmetWrapper";
import VehicleListItem from "./ListItem";

// api imports
import { useVehiclesQuery } from "../../store/services/api";
import { selectVehicleSearch } from "../../store/vehicles/selectors";
import { selectIsAuthed } from "../../store/auth/reducer";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      margin: "8px auto",
      width: "initial",
    },
    loadingSpiner: {
      position: "absolute",
      left: "50%",
      marginTop: theme.spacing(3),
    },
    addButton: {
      display: "block",
      margin: "16px auto 0",
    },
    iconContainer: {
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    cloudIcon: {
      fontSize: "3rem !important",
    },
  })
);

function VehicleList({ searching, isAuthed }) {
  const classes = useStyles();
  const { data: vehicles = [], isLoading } = useVehiclesQuery();
  let history = useHistory();
  console.log("NEW UPDATE");
  return (
    <>
      {isAuthed && (
        <Button
          className={classes.addButton}
          variant="contained"
          color="primary"
          onClick={() => history.push("/uploads")}
        >
          Add Vehicle
        </Button>
      )}
      <Grid container className={classes.root}>
        <HelmetWrapper
          title="Mayfair Motors in Spartanburg SC"
          description="Used Car Dealership in Spartanburg SC selling quality and inspected used cars"
        />

        {searching ? (
          <CircularProgress className={classes.loadingSpiner} />
        ) : (
          vehicles.map((vehicle, i) => (
            <VehicleListItem vehicle={vehicle} key={i} isLoading={isLoading} />
          ))
        )}
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    searching: selectVehicleSearch(state),
    isAuthed: selectIsAuthed(state),
  };
};

const VehicleWrapper = connect(mapStateToProps, {})(VehicleList);

export default VehicleWrapper;
