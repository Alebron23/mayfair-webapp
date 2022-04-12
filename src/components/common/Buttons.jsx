import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
import Button from "@mui/material/Button";

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

const redGradient =
  "linear-gradient(90deg, rgba(253,29,29,1) 0%, rgba(248,72,58,0.9166666666666666) 49%, rgba(252,176,69,1) 100%)";

export function GradientButton({ children, valid, sx, ...props }) {
  const classes = useStyles({ valid });

  return (
    <Button
      variant="contained"
      sx={{
        width: 100,
        height: 40,
        borderRadius: 20,
        background: redGradient,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
