import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) =>
  createStyles({
    gradientButton: {
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      width: "40%",
      background: ({ valid }) =>
        valid
          ? "linear-gradient(45deg, #47CCC6 30%, #3f51b5 90%)"
          : "linear-gradient(45deg, lightgrey 30%, grey 90%)",
      border: "none !important",
      borderRadius: 3,
      color: "white",

      "&:disabled": {
        border: "none",
      },
    },
  })
);

export function GradientButton({ children, valid, ...props }) {
  const classes = useStyles({ valid });

  return (
    <Button {...props} className={classes.gradientButton}>
      {children}
    </Button>
  );
}
