import React, { useEffect } from "react"
import Grid from "@material-ui/core/Grid"

function PaymentsCalculator() {
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{ padding: 16 }}
    >
      <h2>Payments Calculator</h2>
      <img
        style={{ width: "80%" }}
        src="https://www.mybanktracker.com/news/wp-content/uploads/2018/06/personal-loans-calculator.png"
      />
    </Grid>
  )
}

export default PaymentsCalculator
