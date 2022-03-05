import React, { useEffect, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Form } from "react-final-form";
import { TextField } from "mui-rff";
import { useHistory, useLocation } from "react-router-dom";

// User imports
import { addNotif } from "../../store/notifications/actions";
import PhotoUpload from "../VehicleUploads/Photos";

// Redux Imports
import { selectIsAuthed } from "../../store/auth/reducer";
import {
  useVehicleUpdateMutation,
  useVehicleQuery,
  baseEndpoint,
} from "../../store/services/api";

// User Component imports

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    title: {},
    form: {
      maxWidth: 1200,
      width: "96%",
      boxSizing: "border-box",
      margin: "0 auto",
      display: "block",
    },
    textField: {
      marginBottom: 16,

      "& p": {
        position: "absolute",
        top: 35,
      },
    },
    fileInput: {
      margin: 16,
    },
    picContainer: {
      overflowX: "hidden",
      overflowY: "auto",
      border: "1px solid grey",
      borderRadius: 8,
      width: "100%",
      maxWidth: 1200,
      height: 700,
      maxHeight: 1200,

      "-ms-overflow-style": "none" /* for Internet Explorer, Edge */,
      "scrollbar-width": "none",
      "&::-webkit-scrollbar": {
        display: "none" /* for Chrome, Safari, and Opera */,
      },
    },
    pic: {
      borderRadius: 8,
      width: "100%",
      height: "100%",
    },
    uploadPlaceholder: {
      height: "auto",
      borderRadius: 8,
      backgroundColor: "whitesmoke",

      "&:hover": {
        backgroundColor: "gainsboro",
        cursor: "pointer",
      },
    },
    uploadPlaceholderItems: {
      display: "block",
      margin: "0 auto",
    },
    uploadButton: {
      height: 45,
      margin: "20px 16px 16px 16px",
      width: "90%",
      maxWidth: 600,
    },
    imgBtn: {
      display: "block",
      position: "absolute",
      top: 4,
      color: "white",

      "&:hover": {
        cursor: "pointer",
        color: "gainsboro",
      },
    },
    spinner: {
      position: "absolute",
    },
  })
);

function EditVehicle({ addNotification, isAuthed }) {
  const classes = useStyles();
  const [pics, setPics] = useState([]);
  let history = useHistory();
  let location = useLocation();
  const vehicleId = history.location.pathname.split("/")[2];
  const [vehicleUpdate, { isLoading }] = useVehicleUpdateMutation();
  const { data: vehicle = {}, refetch } = useVehicleQuery(vehicleId);
  const { picIds } = vehicle;

  useEffect(() => {
    if (picIds) {
      setPics((statePics) => {
        const effectPics = picIds
          .map((id) => {
            // if id already exists in the array don't update it.
            if (!statePics.find((el) => el.id === id)) {
              //!pics
              return {
                id,
                url: `${baseEndpoint}/vehicles/pics/${id}`,
                loading: true,
              };
            }

            return null;
          })
          .filter(Boolean);
        return [...statePics, ...effectPics];
      });
    }
  }, [picIds]);

  useEffect(() => {
    if (!isAuthed) {
      const vehicleIdArr = location.pathname.split("/");
      const vehicleId = vehicleIdArr[vehicleIdArr.length - 1];
      history.push(`/vehicle/${vehicleId}`);
    }
  }, [isAuthed, history, location.pathname]);

  const hasNewId = () => {
    let hasId = false;

    pics.forEach((pic) => {
      if (!picIds.includes(pic.id)) {
        hasId = true;
      }
    });

    return hasId;
  };

  const onSubmit = async (values, form) => {
    if (!isLoading) {
      const fd = new FormData();
      let res;
      const updateIds = [];

      pics.forEach((pic, i) => {
        if (!vehicle.picIds.includes(pic.id) && pic.file) {
          fd.append("uploaded_files", pic.file, pic.name);
          updateIds.push(pic.id);
        }
      });

      // Form appendages
      fd.append("vin", values.vin);
      fd.append("year", values.year);
      fd.append("make", values.make);
      fd.append("model", values.model);
      fd.append("mileage", values.mileage);
      fd.append("price", values.price);
      fd.append("drivetrain", values.drivetrain);
      fd.append("transmission", values.transmission);
      fd.append("motor", values.motor);
      fd.append("description", values.description);
      fd.append("picIds", JSON.stringify(picIds)); // JSON.stringify(picIds)

      try {
        // FormData transforms the request you attach it to and puts it's own headers
        // so you can't override the headers if you pass in formdata
        res = await vehicleUpdate({ vehicleId, fd });

        if (res && res.data && res.data._id) {
          if (updateIds.length) {
            setPics((statePics) => {
              return statePics
                .map((statePic) =>
                  updateIds.includes(statePic.id) ? undefined : statePic
                )
                .filter(Boolean);
            });
          }
          form.reset(res.data);
          addNotification("vehicleUpload", "Upload Successful", "success");
        }
      } catch (err) {
        addNotification("vehicleUpload", "Upload Error", "error");
      }
    }
  };

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      alignItems="center"
      wrap="nowrap"
    >
      <h1 className={classes.title}>Update Vehicle</h1>
      {vehicle && (
        <>
          <Form
            onSubmit={onSubmit}
            initialValues={vehicle}
            validate={(values) => {
              const requiredFields = [
                "vin",
                "year",
                "make",
                "model",
                "mileage",
                "transmission",
                "drivetrain",
                "motor",
                "description",
              ];
              let errors = {};

              requiredFields.forEach((field) => {
                if (field) {
                  // @ts-ignore
                  if (!values[field]) {
                    errors = {
                      ...errors,
                      [field]: "required",
                    };
                  }
                }
              });

              return errors;
            }}
          >
            {({ handleSubmit, submitting, pristine, valid }) => (
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container alignItems="center" justify="center">
                  <Grid item xs={12}>
                    <TextField
                      label="VIN#"
                      name="vin"
                      id="vehilceUpload-vin"
                      variant="outlined"
                      size="small"
                      className={classes.textField}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Year"
                      name="year"
                      id="vehilceUpload-year"
                      variant="outlined"
                      size="small"
                      className={classes.textField}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Make"
                      name="make"
                      id="vehilceUpload-make"
                      variant="outlined"
                      size="small"
                      className={classes.textField}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Model"
                      name="model"
                      id="vehilceUpload-model"
                      variant="outlined"
                      size="small"
                      className={classes.textField}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Mileage"
                      name="mileage"
                      id="vehilceUpload-mileage"
                      variant="outlined"
                      size="small"
                      className={classes.textField}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Price"
                      name="price"
                      id="vehilceUpload-price"
                      variant="outlined"
                      size="small"
                      className={classes.textField}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Transmission"
                      name="transmission"
                      id="vehilceUpload-transmission"
                      variant="outlined"
                      size="small"
                      className={classes.textField}
                      fullWidth
                      select
                    >
                      <MenuItem key="manual" value="manual">
                        Manual
                      </MenuItem>
                      <MenuItem key="auto" value="Auto">
                        Auto
                      </MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Drivetrain"
                      name="drivetrain"
                      id="vehilceUpload-drivetrain"
                      variant="outlined"
                      size="small"
                      className={classes.textField}
                      fullWidth
                      select
                    >
                      <MenuItem key="4wd" value="4WD">
                        4WD
                      </MenuItem>
                      <MenuItem key="awd" value="AWD">
                        AWD
                      </MenuItem>
                      <MenuItem key="rwd" value="RWD">
                        RWD
                      </MenuItem>
                      <MenuItem key="2wd" value="2WD">
                        2WD
                      </MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Motor"
                      name="motor"
                      id="vehilceUpload-motor"
                      variant="outlined"
                      size="small"
                      className={classes.textField}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Description"
                      name="description"
                      id="vehilceUpload-description"
                      variant="outlined"
                      size="small"
                      className={classes.textField}
                      multiline
                      fullWidth
                      rows={8}
                    />
                  </Grid>

                  <PhotoUpload
                    pics={pics}
                    setPics={setPics}
                    isUpdateForm
                    vehicleId={vehicle._id}
                    vehiclePics={picIds}
                    refetch={refetch}
                  />

                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.uploadButton}
                    disabled={
                      pics.length < 3 ||
                      !valid ||
                      isLoading ||
                      submitting ||
                      // @prettier-ignore
                      (pristine && !hasNewId())
                    }
                    type="submit"
                  >
                    Update
                    {(isLoading || submitting) && (
                      <CircularProgress className={classes.spinner} />
                    )}
                  </Button>
                </Grid>
              </form>
            )}
          </Form>
        </>
      )}
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthed: selectIsAuthed(state),
  };
};

const EditVehicleWrapper = connect(mapStateToProps, {
  addNotification: addNotif,
})(EditVehicle);

export default EditVehicleWrapper;
