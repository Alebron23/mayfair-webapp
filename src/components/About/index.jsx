import React from "react"
import { createStyles, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      // width: "100%",
      // margin: "0 8px",
      // boxSizing: "border-box",
    },
    title: {
      textAlign: "center",
    },
    info: {
      margin: 0,
      padding: "0 16px",
    },
  })
)

function AboutPage({}) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h1 className={classes.title}> About the Business</h1>
      <p className={classes.info}>
        Mayfair Motors was founded in 2020 by two business partners. The aim of
        the business is to provide customers an easy buying experience from
        people they can trust.
      </p>
    </div>
  )
}

export default AboutPage
