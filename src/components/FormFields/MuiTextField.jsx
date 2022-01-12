import React from "react";
import { Field } from "redux-form";
import MUITextField from "@material-ui/core/TextField";

export const renderTextfield = ({
  input,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <MUITextField
      helperText={(touched && error) || " "}
      error={error && touched}
      {...input}
      {...custom}
    />
  );
};

const TextField = (props) => {
  return <Field component={renderTextfield} {...props} />;
};

export default TextField;
