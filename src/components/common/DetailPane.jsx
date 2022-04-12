import * as React from "react";
import { styled } from "@mui/material/styles";

const DetailContainer = styled("div")(({ theme }) => ({
  width: "100%",
  marginBottom: 16,
  padding: "16px",
  border: "1px solid #cfcbc8", // orangish: #f29d5d  lightgrey: #cfcbc8
  boxShadow: `15px 15px 30px #c6c6c7,
             -15px -15px 30px #ffffff`,
  borderRadius: 15,
  boxSizing: "border-box",
}));

// width: "100%",
// marginTop: 16,
// padding: 16,
// boxSizing: "border-box",
// minWidth: 275,

export default function Detail({ title, style, children }) {
  return (
    <DetailContainer style={style}>
      <h2 style={{ margin: 0 }}>{title}</h2>
      {children}
    </DetailContainer>
  );
}
