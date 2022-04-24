import React, { useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InfoIcon from "@material-ui/icons/Info";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Form } from "react-final-form";
import Collapse from "@mui/material/Collapse";
import { TextField } from "mui-rff";
import { useHistory } from "react-router-dom";
import _has from "lodash/has";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux Imports
import { addNotif } from "../../store/notifications/actions";
import {
  setHasAccount,
  setIsAuthed,
  selectAuthHasAccount,
  selectIsAuthed,
} from "../../store/auth/reducer";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../store/services/api";

// User Defined Components & imports
import { passwordReg, email } from "../common/regex";
import { GradientButton } from "../common/Buttons";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    form: {
      maxWidth: 1200,
      // width: "96%",
      boxSizing: "border-box",
      // margin: "0 auto",
      display: "block",
    },
    fieldGrid: {
      marginBottom: theme.spacing(3),
    },
    textField: {
      "& p": {
        position: "absolute",
        top: 35,
      },
    },
    collapse: {
      width: "100%",
    },
    link: {
      "&:hover": {
        cursor: "pointer",
      },
    },
    uploadButton: {
      height: 45,
      margin: "20px 16px 16px 16px",
      width: "90%",
      maxWidth: 600,
    },
    // "@global": {
    //   "div > p": {
    //     position: "absolute",
    //     top: 35,
    //   },
    // },
    spinner: {
      position: "absolute",
    },
  })
);

function Login({
  handleSubmit,
  valid,
  reset,
  submitting,
  hasAccount,
  setHasAccount,
  addNotification,
  setIsAuthed,
  isAuthed,
}) {
  const classes = useStyles();
  const [passwordVis, switchPasswordVis] = React.useState(false);
  const [repasswordVis, switchRePasswordVis] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [login, { isLoading }] = useLoginMutation();
  const [register] = useRegisterMutation();
  const history = useHistory();
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (isAuthed) {
      history.push("/");
    }
  }, [isAuthed, history]);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const onSubmit = async (values, form) => {
    let loginRes;
    let registerRes;

    if (hasAccount) {
      loginRes = await login({
        username: values.email,
        password: values.password,
      });
    } else {
      registerRes = await register({
        username: values.email,
        password: values.password,
      });
    }

    if (_has(loginRes, "data.user._id") || _has(registerRes, "data.user._id")) {
      form.restart();
      history.push("/");
      setIsAuthed(true);
      addNotification("login", "Log In Successful", "success");
    } else if (_has(loginRes, "error")) {
      addNotification("login", "Error Logging In", "error");
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
      <h1 className={classes.title}>{hasAccount ? "Login" : "Register"}</h1>
      <Form
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredFields = hasAccount
            ? ["email", "password"]
            : ["email", "password", "repassword"];
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

          if (values.email && !email.test(values.email)) {
            errors = {
              ...errors,
              email: "invalid email",
            };
          }

          if (values.password && !passwordReg.test(values.password)) {
            errors = {
              ...errors,
              password: "invalid password",
            };
          }

          if (!hasAccount && values.repassword !== values.password) {
            errors = {
              ...errors,
              repassword: "passwords must match",
            };
          }

          return errors;
        }}
      >
        {({ handleSubmit, form, submitting, pristine, values, valid }) => (
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container alignItems="center" justify="center">
              <Grid item xs={12} className={classes.fieldGrid}>
                <TextField
                  label="Email"
                  name="email"
                  size="small"
                  type="email"
                  variant="outlined"
                  fullWidth
                  className={classes.textField}
                />
              </Grid>

              <Grid item xs={12} className={classes.fieldGrid}>
                <TextField
                  label="Password"
                  name="password"
                  size="small"
                  type={passwordVis ? "text" : "password"}
                  fullWidth
                  variant="outlined"
                  className={classes.textField}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password"
                          onClick={() => switchPasswordVis(!passwordVis)}
                        >
                          {passwordVis ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        <IconButton
                          aria-label="password info"
                          onMouseEnter={handlePopoverOpen}
                          onMouseLeave={handlePopoverClose}
                        >
                          <InfoIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: "none",
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Typography sx={{ p: 1 }}>
                  Password must be 14 characters long and use letters, numbers,
                  and special characters
                </Typography>
              </Popover>

              <Collapse in={!hasAccount} className={classes.collapse}>
                <Grid item xs={12} className={classes.fieldGrid}>
                  <TextField
                    label="Repeat Password"
                    name="repassword"
                    variant="outlined"
                    size="small"
                    type={repasswordVis ? "text" : "password"}
                    fullWidth
                    className={classes.textField}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle ssn visibility"
                            onClick={() => switchRePasswordVis(!repasswordVis)}
                          >
                            {repasswordVis ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Collapse>

              {/* <Grid item xs={12}>
                <Link
                  onClick={() => setHasAccount(!hasAccount)}
                  className={classes.link}
                >
                  {hasAccount ? "Not Registered?" : "Have an Account?"}
                </Link>
              </Grid> */}

              <GradientButton disabled={!valid} type="submit">
                {hasAccount ? "Login" : "Register"}
                {(isLoading || submitting) && (
                  <CircularProgress className={classes.spinner} />
                )}
              </GradientButton>
            </Grid>
          </form>
        )}
      </Form>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    hasAccount: selectAuthHasAccount(state),
    isAuthed: selectIsAuthed(state),
  };
};

const LoginFormWrapper = connect(mapStateToProps, {
  addNotification: addNotif,
  setHasAccount,
  setIsAuthed,
})(Login);

export default LoginFormWrapper;
