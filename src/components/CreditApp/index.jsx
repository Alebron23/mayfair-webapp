import React from "react";
import emailjs from "emailjs-com";

import { reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import CircularProgress from "@material-ui/core/CircularProgress";
import { GradientButton } from "../common/Buttons";

import { email, zipCode, cityName, ssn } from "../common/regex.js";
import TextField from "../FormFields/MuiTextField";
import { addNotif } from "../../store/notifications/actions";
import HelmetWrapper from "../HelmetWrapper";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      boxSizing: "border-box",
      marginBottom: theme.spacing(2),
      margin: "0 auto",

      [theme.breakpoints.up("sm")]: {
        maxWidth: 1200,
      },
    },
    formPaper: {
      width: "100%",
      margin: "0 auto",
      padding: theme.spacing(2),
      boxSizing: "border-box",
    },
    title: {
      textAlign: "center",
      marginBottom: theme.spacing(1),
    },
    privacyText: {
      width: "100%",
      margin: "0 auto 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      // [theme.breakpoints.up("sm")]: {
      //   width: "90%",
      // },
    },
    finComp: {
      width: "95%",
      margin: "0 auto",
      marginBottom: 8,

      [theme.breakpoints.up("sm")]: {
        width: "100%",
      },
    },
    infoText: {
      width: "100%",
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: theme.spacing(2),
    },
    checkmark: {
      color: "green",
      margin: "auto 4px",
    },
    identityIcon: {
      color: "grey",
      margin: `0 ${theme.spacing(0.5)}px`,
    },
    form: {
      boxSizing: "border-box",
      width: "100%",
      margin: "0 auto",
      display: "block",
    },
    inputGrid: {
      height: 50,
    },
    loadSpinner: {
      width: "15px !important",
      height: "15px !important",
      position: "absolute",
      right: theme.spacing(3),
      color: "white",
    },
  })
);

const CreditApp = (props) => {
  const { handleSubmit, valid, reset, addNotification, submitting } = props;

  const [passwordVis, switchPasswordVis] = React.useState(false);
  const [finComp, setFinComp] = React.useState(-2);
  const classes = useStyles({ valid: valid && finComp > -2 });

  const handleChange = (event) => {
    setFinComp(event.target.value);
  };

  const onSubmit = (values) => {
    const finInfo = [
      { name: "SC Telco", email: "lebron.alex@yahoo.com" },
      { name: "OneMain Financial", email: "lebron@mayfairmotorco.com" },
    ];
    const loops = finComp === -1 ? finInfo : finInfo.slice(finComp, 1);

    const emailRequests = loops.map((info) =>
      emailjs.send(
        "service_i60y4ob",
        "creditapptemplate",
        {
          full_name: values.fullName,
          birthday: values.birthday,
          social: values.social,
          email: values.email,
          address: `${values.street} ${values.suite}, ${values.city}, ${values.state} ${values.zip}`,
          employment: values.employment,
          salary: values.salary,
          reply_to: values.email,
          to_name: info.name,
          to_email: info.email,
          from_name: values.fullName,
        },
        "user_wlmSfJ74mBeGnWOqUUQtj"
      )
    );

    return Promise.all(emailRequests)
      .then(() => {
        reset();
        addNotification("creditApp", "Submit Successful", "success");
        setFinComp(-2);
      })
      .catch((err) => {
        addNotification("creditApp", "Please try again", "error");
        throw new SubmissionError();
      });
  };

  return (
    <div className={classes.root}>
      <HelmetWrapper
        title="Mayfair Motors Credit Application"
        description="Fill out the credit application to see what amount you qualify for"
      />
      <h1 className={classes.title}>Credit Application</h1>
      <span className={classes.privacyText}>
        <PermIdentityIcon className={classes.identityIcon} />
        This information is neccessary for your application but is never shared
        or sold to other parties.
      </span>

      <div className={classes.finComp}>
        <TextField
          id="fin-comp-select"
          select
          name="finComps"
          label="Finance Company"
          value={finComp}
          onChange={handleChange}
          helperText="Please select who you would like to apply with"
          variant="outlined"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        >
          <MenuItem key={"sctelco"} value="0">
            SC Telco
          </MenuItem>
          <MenuItem key={"onmain"} value="1">
            OneMain Financial (Low Credit)
          </MenuItem>
          <MenuItem key={"both"} value="-1">
            SC Telco & OneMain Financial
          </MenuItem>
        </TextField>
      </div>

      <Paper className={classes.formPaper} elevation={20}>
        <span className={classes.infoText}>
          <CheckCircleOutlineIcon className={classes.checkmark} />
          Your name and information must match the information on your drivers
          license.
        </span>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <Grid container alignItems="center">
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                name="fullName"
                id="creditapp-fullname"
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{}}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                id="creditapp-email"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Street"
                name="street"
                id="creditapp-street"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="apt, suite, building - optional"
                name="suite"
                id="creditapp-suite"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>

            <Grid container item spacing={1} shrink={0}>
              <Grid item xs={8} md={5}>
                <TextField
                  label="City"
                  name="city"
                  id="creditapp-city"
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>

              <Grid item xs={4} md={2}>
                <TextField
                  label="State"
                  name="state"
                  id="creditapp-state"
                  variant="outlined"
                  size="small"
                  fullWidth
                  select
                >
                  <MenuItem key="AL" value="AL">
                    AL
                  </MenuItem>
                  <MenuItem key="Ak" value="Ak">
                    Ak
                  </MenuItem>
                  <MenuItem key="AZ" value="AZ">
                    AZ
                  </MenuItem>
                  <MenuItem key="AR" value="AR">
                    AR
                  </MenuItem>
                  <MenuItem key="CA" value="CA">
                    CA
                  </MenuItem>
                  <MenuItem key="CO" value="CO">
                    CO
                  </MenuItem>
                  <MenuItem key="CT" value="CT">
                    CT
                  </MenuItem>
                  <MenuItem key="DE" value="DE">
                    DE
                  </MenuItem>
                  <MenuItem key="FL" value="FL">
                    FL
                  </MenuItem>
                  <MenuItem key="GA" value="GA">
                    GA
                  </MenuItem>
                  <MenuItem key="HI" value="HI">
                    HI
                  </MenuItem>
                  <MenuItem key="ID" value="ID">
                    ID
                  </MenuItem>
                  <MenuItem key="IL" value="IL">
                    IL
                  </MenuItem>
                  <MenuItem key="IN" value="IN">
                    IN
                  </MenuItem>
                  <MenuItem key="IA" value="IA">
                    IA
                  </MenuItem>
                  <MenuItem key="KS" value="KS">
                    KS
                  </MenuItem>
                  <MenuItem key="KY" value="KY">
                    KY
                  </MenuItem>
                  <MenuItem key="LA" value="LA">
                    LA
                  </MenuItem>
                  <MenuItem key="ME" value="ME">
                    ME
                  </MenuItem>
                  <MenuItem key="MD" value="MD">
                    MD
                  </MenuItem>
                  <MenuItem key="MA" value="MA">
                    MA
                  </MenuItem>
                  <MenuItem key="MI" value="MI">
                    MI
                  </MenuItem>
                  <MenuItem key="MN" value="MN">
                    MN
                  </MenuItem>
                  <MenuItem key="MS" value="MS">
                    MS
                  </MenuItem>
                  <MenuItem key="MO" value="MO">
                    MO
                  </MenuItem>
                  <MenuItem key="MT" value="MT">
                    MT
                  </MenuItem>
                  <MenuItem key="NE" value="NE">
                    NE
                  </MenuItem>
                  <MenuItem key="NV" value="NV">
                    NV
                  </MenuItem>
                  <MenuItem key="NY" value="NY">
                    NY
                  </MenuItem>
                  <MenuItem key="NC" value="NC">
                    NC
                  </MenuItem>
                  <MenuItem key="ND" value="ND">
                    ND
                  </MenuItem>
                  <MenuItem key="OH" value="OH">
                    OH
                  </MenuItem>
                  <MenuItem key="OK" value="OK">
                    OK
                  </MenuItem>
                  <MenuItem key="OR" value="OR">
                    OR
                  </MenuItem>
                  <MenuItem key="PA" value="PA">
                    PA
                  </MenuItem>
                  <MenuItem key="RI" value="RI">
                    RI
                  </MenuItem>
                  <MenuItem key="SC" value="SC">
                    SC
                  </MenuItem>
                  <MenuItem key="SD" value="SD">
                    SD
                  </MenuItem>
                  <MenuItem key="TN" value="TN">
                    TN
                  </MenuItem>
                  <MenuItem key="TX" value="TX">
                    TX
                  </MenuItem>
                  <MenuItem key="UT" value="UT">
                    UT
                  </MenuItem>
                  <MenuItem key="VT" value="VT">
                    VT
                  </MenuItem>
                  <MenuItem key="VA" value="VA">
                    VA
                  </MenuItem>
                  <MenuItem key="WA" value="WA">
                    WA
                  </MenuItem>
                  <MenuItem key="WV" value="WV">
                    WV
                  </MenuItem>
                  <MenuItem key="WI" value="WI">
                    WI
                  </MenuItem>
                  <MenuItem key="WY" value="WY">
                    WY
                  </MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={8} md={5}>
                <TextField
                  label="Zip"
                  name="zip"
                  id="creditapp-zip"
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Birthday"
                placeholder=""
                name="birth"
                type="date"
                id="creditapp-birth"
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Employment Status"
                name="employment"
                id="creditapp-employement"
                variant="outlined"
                size="small"
                select
                fullWidth
              >
                <MenuItem key="employed" value="employed">
                  Employed
                </MenuItem>
                <MenuItem key="unemployed" value="unemployed">
                  Unemployed
                </MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Anual Salary"
                name="salary"
                id="creditapp-salary"
                variant="outlined"
                size="small"
                fullWidth
                select
              >
                <MenuItem key="20" value="20">
                  {"Below $20,000"}
                </MenuItem>
                <MenuItem key="30" value="30">
                  {"$20,000-$30,000"}
                </MenuItem>
                <MenuItem key="40" value="40">
                  {"$30,000-$40,000"}
                </MenuItem>
                <MenuItem key="50" value="50">
                  {"$40,000-$50,000"}
                </MenuItem>
                <MenuItem key="60" value="60">
                  {"$50,000-$60,000"}
                </MenuItem>
                <MenuItem key="70" value="70">
                  {"Above $60,000"}
                </MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Social Security Number"
                name="social"
                id="formatted-numberformat-input"
                variant="outlined"
                size="small"
                fullWidth
                type={passwordVis ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle ssn visibility"
                        onClick={() => switchPasswordVis(!passwordVis)}
                      >
                        {passwordVis ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <GradientButton
            type="submit"
            disabled={!valid || submitting || finComp < -1}
            valid={valid && finComp > -2}
            sx={{
              display: "block",
              margin: "0 auto",
            }}
          >
            <span>Submit</span>
            {submitting && <CircularProgress className={classes.loadSpinner} />}
          </GradientButton>
        </form>
      </Paper>
    </div>
  );
};

const validate = (values) => {
  const requiredFields = [
    "fullName",
    "email",
    "street",
    "city",
    "state",
    "zip",
    "birth",
    "employment",
    "salary",
    "social",
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

  if (values.email && !email.test(values.email)) {
    errors = {
      ...errors,
      email: "invalid email",
    };
  }

  if (values.zip && !zipCode.test(values.zip)) {
    errors = {
      ...errors,
      zip: "invalid zip code",
    };
  }

  if (values.city && !cityName.test(values.city)) {
    errors = {
      ...errors,
      city: "invalid city name",
    };
  }

  if (values.social && !ssn.test(values.social)) {
    errors = {
      ...errors,
      social: "invalid social",
    };
  }

  return errors;
};

const CreditForm = reduxForm({
  form: "creditapp",
  validate,
})(CreditApp);

const CreditFormWrapper = connect(null, {
  addNotification: addNotif,
})(CreditForm);

export default CreditFormWrapper;
