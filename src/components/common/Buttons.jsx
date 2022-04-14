import React from "react";
import Button from "@mui/material/Button";

const redGradient =
  "linear-gradient(90deg, rgba(253,29,29,1) 0%, rgba(248,72,58,0.9166666666666666) 49%, rgba(252,176,69,1) 100%)";

export function GradientButton({ children, valid, sx, ...props }) {
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
