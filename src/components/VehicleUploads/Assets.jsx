import React, { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Form } from "react-final-form";
import { TextField } from "mui-rff";
import _has from "lodash/has";

// User imports
import { addNotif } from "../../store/notifications/actions";
import PhotoUpload from "./Photos";

// Redux Imports
import {} from "../../store/vehicles/selectors";
import { useUploadAssetMutation } from "../../store/services/api";

// User Defined Components & imports

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    form: {
      maxWidth: 1200,
      width: "96%",
      boxSizing: "border-box",
      margin: "0 auto",
      display: "block",
    },
    uploadButton: {
      height: 45,
      margin: "20px 16px 16px 16px",
      width: "90%",
      maxWidth: 600,
    },

    textField: {
      marginBottom: 16,
    },
  })
);

function AssetsUploader({ addNotification }) {
  const classes = useStyles();
  const [pics, setPics] = useState([]);
  const [uploadAsset] = useUploadAssetMutation();

  const onSubmit = async (values, form) => {
    const fd = new FormData();
    let uploadRes;

    pics.forEach((pic) => {
      fd.append("uploaded_files", pic.file, pic.name);
    });

    // Form appendages
    fd.append("name", values.name);

    try {
      uploadRes = await uploadAsset(fd);
      console.log(uploadRes);
      if (_has(uploadRes, "data.id")) {
        form.restart();
        setPics([]);
      }
    } catch (err) {
      console.log("ERROR:", err);
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
      <h1 className={classes.title}>Upload Asset</h1>
      <Form
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredFields = ["name"];
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
        {({ handleSubmit, form, submitting, pristine, values, valid }) => (
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container alignItems="center" justify="center">
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  name="name"
                  size="small"
                  variant="outlined"
                  fullWidth
                  className={classes.textField}
                />
              </Grid>

              <PhotoUpload pics={pics} setPics={setPics} />

              <Button
                variant="outlined"
                color="primary"
                className={classes.uploadButton}
                disabled={!valid}
                type="submit"
              >
                Upload
              </Button>
            </Grid>
          </form>
        )}
      </Form>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const AssetsUploaderWrapper = connect(mapStateToProps, {
  addNotification: addNotif,
})(AssetsUploader);

export default AssetsUploaderWrapper;
