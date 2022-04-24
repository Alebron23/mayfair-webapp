import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Logo from "../../imgs/logoTransparent.png";

const Footer = () => (
  <Grid
    container
    spacing={2}
    style={{
      backgroundColor: "#f5f5f5",
      padding: "8px 16px",
    }}
  >
    <Grid container spacing={2} style={{ maxWidth: 1200, margin: "0 auto" }}>
      <Grid item xs={12}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Box
            display={"flex"}
            component="a"
            underline="none"
            href="/"
            title="mayfair"
            height={24}
            width={35}
          >
            <img src={Logo} style={{ width: 23, height: 23 }} alt="logo" />
          </Box>
          <Box display="flex" flexWrap={"wrap"} alignItems={"center"}>
            <Box marginTop={1} marginRight={2}>
              <Link
                underline="none"
                component="a"
                href="/"
                color="textPrimary"
                variant={"subtitle2"}
              >
                Vehicles
              </Link>
            </Box>
            <Box marginTop={1} marginRight={2}>
              <Link
                underline="none"
                component="a"
                href="/credit-app"
                color="textPrimary"
                variant={"subtitle2"}
              >
                Credit Application
              </Link>
            </Box>
            <Box marginTop={1}>
              <Button
                variant="outlined"
                color="primary"
                component="a"
                target="blank"
                href="/info"
                size="small"
              >
                Info
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography
          align={"center"}
          variant={"subtitle2"}
          color="textSecondary"
          gutterBottom
        >
          &copy; Mayfair Motors. 2021. All rights reserved
        </Typography>
        <Typography
          align={"center"}
          variant={"caption"}
          color="textSecondary"
          component={"p"}
        >
          When you visit or interact with our sites, services or tools, we or
          our authorised service providers may use cookies for storing
          information to help provide you with a better, faster and safer
          experience and for marketing purposes.
        </Typography>
      </Grid>
    </Grid>
  </Grid>
);

export default Footer;
