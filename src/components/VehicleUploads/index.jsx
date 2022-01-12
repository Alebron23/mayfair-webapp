import React, { useEffect, useState } from "react"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import { useHistory } from "react-router-dom"
import { connect } from "react-redux"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import MenuItem from "@material-ui/core/MenuItem"
import CircularProgress from "@material-ui/core/CircularProgress"
import { Form } from "react-final-form"
import { TextField } from "mui-rff"

// User imports
import { addNotif } from "../../store/notifications/actions"
import PhotoUpload from "./Photos"

// Redux Imports
import { selectIsAuthed } from "../../store/auth/reducer"
import { useVehicleUploadsMutation } from "../../store/services/api"

// User Component imports

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: "100%",
      // height: "calc(100vh - 56px)",
      //   backgroundImage: `url(${backgroundGradient})`,
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover",

      // "@media only screen and (min-width: 600px)": {
      //   height: "calc(100vh - 64px)",
      // },
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
)

function VehicleUploader({ addNotification, isAuthed }) {
  const classes = useStyles()
  const [pics, setPics] = useState([])
  const [vehicleUploads, { isLoading }] = useVehicleUploadsMutation()
  let history = useHistory()

  useEffect(() => {
    if (!isAuthed) {
      history.push("/")
    }
  }, [isAuthed])

  const onSubmit = async (values, form) => {
    if (!isLoading) {
      const fd = new FormData()
      let res

      pics.forEach((pic, i) => {
        if (pic.file) fd.append("uploaded_files", pic.file, pic.name)
      })

      // Form appendages
      fd.append("vin", values.vin)
      fd.append("year", values.year)
      fd.append("make", values.make)
      fd.append("model", values.model)
      fd.append("mileage", values.mileage)
      fd.append("price", values.price)
      fd.append("drivetrain", values.drivetrain)
      fd.append("transmission", values.transmission)
      fd.append("motor", values.motor)
      fd.append("description", values.description)

      try {
        res = await vehicleUploads(fd)

        if (res && res.data) {
          setPics([])
          form.restart()
          addNotification("vehicleUpload", "Upload Successful", "success")
        }
      } catch (err) {
        console.log("UPLOAD VEHICLE REQ:", err)
      }
    }
  }

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      alignItems="center"
      wrap="nowrap"
    >
      <h1 className={classes.title}>Upload Vehicle</h1>
      <Form
        onSubmit={onSubmit}
        validate={values => {
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
          ]
          let errors = {}

          requiredFields.forEach(field => {
            if (field) {
              // @ts-ignore
              if (!values[field]) {
                errors = {
                  ...errors,
                  [field]: "required",
                }
              }
            }
          })

          return errors
        }}
      >
        {({ handleSubmit, form, submitting, pristine, values, valid }) => (
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

              <PhotoUpload pics={pics} setPics={setPics} />
              <Button
                variant="outlined"
                color="primary"
                className={classes.uploadButton}
                disabled={pics.length < 3 || !valid || isLoading || submitting}
                type="submit"
              >
                Upload
                {(isLoading || submitting) && (
                  <CircularProgress className={classes.spinner} />
                )}
              </Button>
            </Grid>
          </form>
        )}
      </Form>
    </Grid>
  )
}

const mapStateToProps = state => {
  return {
    isAuthed: selectIsAuthed(state),
  }
}

const VehicleUploaderWrapper = connect(mapStateToProps, {
  addNotification: addNotif,
})(VehicleUploader)

export default VehicleUploaderWrapper
