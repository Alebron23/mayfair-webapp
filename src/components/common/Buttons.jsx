import React from "react";
import Button from "@mui/material/Button";

export const redGradient = "linear-gradient(90deg, red, orange)";
// 90deg, rgba(253,29,29,1) 0%, rgba(248,72,58,0.916) 49%, rgba(252,176,69,1) 100%

export function GradientButton({ children, valid, sx, ...props }) {
  return (
    <Button
      variant="contained"
      sx={{
        width: 100,
        height: 40,
        borderRadius: 15,
        background: redGradient,
        fontWeight: "bold",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
