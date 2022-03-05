import React from "react";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      // width: "100%",
      // margin: "0 8px",
      // boxSizing: "border-box",
      padding: "0 32px",
    },
    title: {
      textAlign: "center",
    },
    topInfo: {
      margin: "0 0 16px 0",
      padding: "0",
      fontSize: "1.3rem",
      fontFamily: "'Poppins', sans-serif",
    },
    bottomInfo: {
      margin: "0 16px 16px 0",
      padding: "0",
      fontSize: "1.3rem",
      fontFamily: "'Poppins', sans-serif",
    },
    bottomGrid: {
      marginTop: 16,
    },
  })
);

function AboutPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className={classes.title}> About the Business</h1>

      <Grid container spacing={1}>
        <Grid container item direction="column" wrap="nowrap" xs={12} md={8}>
          <p className={classes.bottomInfo}>
            Mayfairs Motors was founded in the year 2020 by two business
            partners. The aim of the business is to provide customers good
            prices on vehicles with an easy buying experience from people they
            can trust.
          </p>
          <p className={classes.bottomInfo}>
            Sed ut perspiciatis, unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam eaque ipsa,
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt, explicabo.
          </p>
          <p className={classes.bottomInfo}>
            Sed ut perspiciatis, unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam eaque ipsa,
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt, explicabo.
          </p>
        </Grid>

        <Grid container item xs={12} md={4}>
          <img
            src="https://img.search.brave.com/eVpg2svDAKNqyzsKxe-RciLsfDn8_mAVQuenNmSu6Rw/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/aGRjYXJ3YWxscGFw/ZXJzLmNvbS93YWxs/cy9kb2RnZV9jaGFs/bGVuZ2VyX3NydF9o/ZWxsY2F0X3doaXRl/LUhELmpwZw"
            alt="2015 Dodge Challenger Hellcat"
            style={{ width: "100%", height: "auto" }}
          />
        </Grid>
      </Grid>

      <Grid className={classes.bottomGrid} container spacing={3}>
        <Grid container item xs={12} md={4}>
          <img
            src="https://img.search.brave.com/BMTmzCMwJxVHg-AibjsEz-Js4vJdoJTRHJbdCbQG76A/rs:fit:770:513:1/g:ce/aHR0cHM6Ly9pbWcu/c20zNjAuY2EvaXIv/dzc3MC9pbWFnZXMv/aW52ZW50b3J5L2dy/b3VwZS1oYW1lbC1i/bGFpbnZpbGxlL2No/ZXZyb2xldC9jb3J2/ZXR0ZS8yMDEwLzU4/NjM3NDgvNTg2Mzc0/OF8wMjAzMl9PTkU4/MF81NTg3MDAzXzUw/NTY4NDQ3Ny5qcGc"
            alt="2010 Chevy Corvette Z06"
            style={{ width: "100%", height: "auto" }}
          />
        </Grid>

        <Grid
          container
          item
          spacing={1}
          direction="column"
          wrap="nowrap"
          xs={12}
          md={8}
        >
          <p className={classes.topInfo}>
            It's not about us. It's about the cars we sell and the service we
            provide to our customers. This is what matters to us and is what our
            business is centered around. Cars are our passion and we hope to
            bring the same joy that we derive from cars to you.
          </p>
          <p className={classes.topInfo}>
            Our integrity as dealers is at the center of our focus. We strive to
            bring you the best prices and deals without sacrificing a milligram
            of our integrety. This is a tough balance to manage but is what
            wakes us up everyday and drives us to succeed in this business.
          </p>
          <p className={classes.topInfo}>
            Sed ut perspiciatis, unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam eaque ipsa,
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt, explicabo.
          </p>

          <p className={classes.topInfo}>
            Sed ut perspiciatis, unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam eaque ipsa,
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt, explicabo.
          </p>
        </Grid>
      </Grid>
    </div>
  );
}

export default AboutPage;
