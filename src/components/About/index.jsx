import React from "react";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import DetailPane from "../common/DetailPane";
import { GradientButton } from "../common/Buttons";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: "0 16px",
    },
    title: {
      textAlign: "center",
      marginTop: 0,
    },
    topInfo: {
      margin: "0 0 16px 0",
      padding: "0",
      fontSize: "1.3rem",
      fontFamily: "'Poppins', sans-serif",
    },
    bottomInfo: {
      margin: "0 0 16px 0",
      padding: "0",
      fontSize: "1.3rem",
      fontFamily: "'Poppins', sans-serif",
    },
  })
);

function AboutPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className={classes.title}> About</h1>

      <DetailPane title={"Contact"}>
        <Grid container spacing={3} direction="column">
          <h4 style={{ margin: "16px 0 0 24px" }}>Address</h4>
          <ul style={{ paddingLeft: 48 }}>
            <li>161 Wingo Rd, Roebuck, SC 29376</li>
          </ul>

          <h4 style={{ margin: "8px 0 0 24px" }}>Email</h4>
          <ul style={{ paddingLeft: 48 }}>
            <li>
              <a href="mailto:info@mayfairmotorco.com">
                info@mayfairmotorco.com
              </a>{" "}
            </li>
          </ul>
          {/* href="tel:+1-864-804-7528" */}
          <GradientButton sx={{ margin: "8px 16px" }}>Call Now</GradientButton>
        </Grid>
      </DetailPane>
      <DetailPane>
        <Grid container spacing={3}>
          <Grid container item direction="column" wrap="nowrap" xs={12} lg={8}>
            <p className={classes.bottomInfo}>
              Mayfairs Motors was founded in the year 2020 by two business
              partners. The aim of the business is to provide customers good
              prices on vehicles with an easy buying experience from people they
              can trust.
            </p>
          </Grid>

          <Grid container item xs={12} lg={4}>
            <img
              src="https://img.search.brave.com/eVpg2svDAKNqyzsKxe-RciLsfDn8_mAVQuenNmSu6Rw/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/aGRjYXJ3YWxscGFw/ZXJzLmNvbS93YWxs/cy9kb2RnZV9jaGFs/bGVuZ2VyX3NydF9o/ZWxsY2F0X3doaXRl/LUhELmpwZw"
              alt="2015 Dodge Challenger Hellcat"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "15px",
              }}
            />
          </Grid>
        </Grid>
      </DetailPane>

      <DetailPane>
        <Grid className={classes.bottomGrid} container spacing={3}>
          <Grid container item xs={12} lg={4}>
            <img
              src="https://img.search.brave.com/BMTmzCMwJxVHg-AibjsEz-Js4vJdoJTRHJbdCbQG76A/rs:fit:770:513:1/g:ce/aHR0cHM6Ly9pbWcu/c20zNjAuY2EvaXIv/dzc3MC9pbWFnZXMv/aW52ZW50b3J5L2dy/b3VwZS1oYW1lbC1i/bGFpbnZpbGxlL2No/ZXZyb2xldC9jb3J2/ZXR0ZS8yMDEwLzU4/NjM3NDgvNTg2Mzc0/OF8wMjAzMl9PTkU4/MF81NTg3MDAzXzUw/NTY4NDQ3Ny5qcGc"
              alt="2010 Chevy Corvette Z06"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "15px",
              }}
            />
          </Grid>

          <Grid
            container
            item
            spacing={1}
            direction="column"
            wrap="nowrap"
            xs={12}
            lg={8}
          >
            <p className={classes.topInfo}>
              It's not about us. It's about the cars we sell and the service we
              provide to our customers. This is what matters to us and is what
              our business is centered around. Cars are our passion and we hope
              to bring the same joy that we derive from cars to you.
            </p>
            <p className={classes.topInfo}>
              Our integrity as dealers is at the center of our focus. We strive
              to bring you the best prices and deals without sacrificing a
              milligram of our integrety. This is a tough balance to manage but
              is what wakes us up everyday and drives us to succeed in this
              business.
            </p>
          </Grid>
        </Grid>
      </DetailPane>
    </div>
  );
}

export default AboutPage;
