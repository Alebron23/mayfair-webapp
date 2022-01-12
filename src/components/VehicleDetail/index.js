import React from "react"
import { createStyles, makeStyles } from "@material-ui/core/styles"

// TODO: uninistal carousel
import Carousel from "react-material-ui-carousel"

import { useHistory } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Divider from "@material-ui/core/Divider"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import ArrowUpIcon from "@material-ui/icons/ArrowDropUp"
import classnames from "classnames"
import ImageGallery from "react-image-gallery"
import CircularProgress from "@material-ui/core/CircularProgress"
import WarningIcon from "@material-ui/icons/Warning"

import CarLove from "../../imgs/carlove.png"
import FourWheel from "../../imgs/fourwheel.png"
import Owner from "../../imgs/owner.png"
import ManualTrans from "../../imgs/manualLogo.png"

import { useAssetsQuery, useVehicleQuery } from "../../store/services/api"

const useStyles = makeStyles(theme =>
  createStyles({
    outerWrapper: {
      position: "relative",
      margin: "0 auto",
      maxWidth: 1300,
    },
    paddingWrapper: {
      "@media only screen and (min-width: 900px)": {
        paddingTop: "55%",
      },
    },
    root: {
      width: "100%",
      padding: 16,
      display: "flex",
      boxSizing: "border-box",
      justifyContent: "center",
      flexDirection: "column",

      "@media only screen and (min-width: 900px)": {
        flexDirection: "row",
        position: "absolute",
        top: 0,
        height: "100%",
      },
    },
    imgGalleryWrapper: {
      width: "100%",
      position: "relative",
    },
    imgContainer: {
      width: "100%",
      height: "auto",

      "@media only screen and (min-width: 900px)": {
        width: "60%",
      },
    },
    vehiclePic: {
      width: "100%",
      height: "auto",
      borderRadius: 5,
    },
    loadingContainer: {
      width: "100%",
      height: "450px",
      border: "1px solid grey",
      borderRadius: 5,

      "@media only screen and (min-width: 900px)": {
        height: "100%",
      },
    },
    imgSpinner: {
      width: "30% !important",
      height: "initial !important",
    },
    warningIcon: {
      width: 50,
      height: 50,
    },
    warningText: {
      marginTop: theme.spacing(3),
      fontSize: theme.spacing(2.5),
    },
    infoContainer: {
      width: "100%",
      marginTop: 16,
      padding: 16,
      boxSizing: "border-box",
      minWidth: 275,

      "@media only screen and (min-width: 900px)": {
        width: "38%",
        marginTop: 0,
        marginLeft: 16,
        overflowY: "auto",
      },
    },
    infoHeading: {
      margin: 0,
    },
    milesPriceContainer: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      fontSize: "1.3rem",
      margin: `${theme.spacing(2)}px 0 ${theme.spacing(2)}px 0`,
    },
    payment: {
      fontSize: ".7rem",
      color: theme.palette.info.main,

      "&:hover": {
        textDecoration: "underline",
        cursor: "pointer",
      },
    },
    miles: {},
    vin: {
      fontSize: ".7rem",
      color: theme.palette.grey[500],
      margin: `0 0 ${theme.spacing(2)}px 0`,
    },
    infoImgContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: theme.spacing(2),
    },
    infoImg: {
      width: 30,
      marginRight: theme.spacing(2),
    },
    infoImgHeading: {
      fontWeight: 500,
    },
    infoImgText: {
      color: theme.palette.grey[600],
      fontSize: ".8rem",
    },
    dropdownHeading: {
      fontWeight: 500,
    },
    hoverCursor: {
      "&:hover": {
        cursor: "pointer",
      },
    },
    contactNumber: {
      marginTop: theme.spacing(2),
    },
    phoneNumber: {
      color: theme.palette.info.main,
      textDecoration: "underline",
    },
  })
)

export default function VehicleDetail() {
  const classes = useStyles()
  let history = useHistory()

  const vehicleId = history.location.pathname.split("/")[2]
  const [isSpecShown, setSpecShown] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  const { data: assets = [] } = useAssetsQuery()
  const assetPics = assets.reduce((prev, curr) => {
    return { ...prev, [curr.name]: { ids: curr.picIds } }
  }, {})
  const { data: vehicle = [] } = useVehicleQuery(vehicleId)

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  function Item(props) {
    return (
      <div>
        <img
          className={classes.vehiclePic}
          src={props.original}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} ${
            props.ind + 1
          }`}
          onLoad={() => {
            if (props.ind === 0) {
              setLoading(false)
            }
          }}
          onError={() => {
            setLoading(false)
            setError(true)
          }}
        />
      </div>
    )
  }

  return (
    <div className={classes.outerWrapper}>
      <div className={classes.paddingWrapper}>
        <div className={classes.root}>
          {vehicle && (
            <>
              <div className={classes.imgGalleryWrapper}>
                <Grid
                  className={classes.loadingContainer}
                  container
                  alignItems="center"
                  justify="center"
                  style={{
                    display: loading ? "flex" : "none",
                  }}
                >
                  <CircularProgress className={classes.imgSpinner} />
                </Grid>

                {error ? (
                  <Grid
                    className={classes.loadingContainer}
                    container
                    alignItems="center"
                    justify="center"
                    direction="column"
                  >
                    {/* TODO: extract this component or component styles */}
                    <WarningIcon className={classes.warningIcon} />
                    <span className={classes.warningText}>
                      Image Failed to Load
                    </span>
                  </Grid>
                ) : (
                  <div
                    style={{
                      opacity: loading ? 0 : 1,
                      width: "100%",
                      position: loading ? "absolute" : "initial",
                    }}
                  >
                    {vehicle && vehicle.picIds && (
                      <>
                        <ImageGallery
                          showPlayButton={false}
                          items={vehicle.picIds.map((id, i) => ({
                            original: `http://localhost:9000/vehicles/pics/${id}`,
                            thumbnail: `http://localhost:9000/vehicles/pics/${id}`,
                            renderItem: Item,
                            ind: i,
                          }))}
                        />
                      </>
                    )}
                  </div>
                )}
              </div>

              <Paper className={classes.infoContainer} elevation={3}>
                <h2 className={classes.infoHeading}>
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h2>

                <div className={classes.milesPriceContainer}>
                  <span>
                    <span>${(vehicle.price * 1).toLocaleString("en-US")}</span>
                    <div
                      className={classes.payment}
                      onClick={e => {
                        e.stopPropagation()
                        history.push("/payments-calculator")
                      }}
                    >
                      {`$${Math.round(vehicle.price / 60)}/month`}
                    </div>
                  </span>
                  ·{" "}
                  <div>
                    {(vehicle.mileage * 1).toLocaleString("en-US")} miles
                  </div>
                </div>
                <div className={classes.vin}>VIN # 3C6TR5EJ3LG168496</div>
                <div className={classes.infoImgContainer}>
                  <img
                    src={CarLove}
                    alt="No Accidents"
                    className={classes.infoImg}
                  />
                  <div>
                    <div className={classes.infoImgHeading}> No Accidents</div>
                    <span className={classes.infoImgText}>
                      Reported by AutoCheck®.
                    </span>
                  </div>
                </div>
                <div className={classes.infoImgContainer}>
                  <img
                    src={Owner}
                    alt="One Owner"
                    className={classes.infoImg}
                  />
                  <span>
                    <div className={classes.infoImgHeading}>Single Owner</div>
                    <span className={classes.infoImgText}>
                      Reported by AutoCheck®.
                    </span>
                  </span>
                </div>
                {console.log(vehicle)}
                {vehicle.drivetrain === "4WD" && (
                  <div className={classes.infoImgContainer}>
                    <img
                      src={FourWheel}
                      alt="Four Wheel Drive"
                      className={classes.infoImg}
                    />
                    <span>
                      <div className={classes.infoImgHeading}>
                        Four-Wheel Drive
                      </div>
                      <span className={classes.infoImgText}>
                        A certified country boy
                      </span>
                    </span>
                  </div>
                )}
                {vehicle.transmission === "manual" && (
                  <div className={classes.infoImgContainer}>
                    <img
                      src={ManualTrans}
                      alt="Manual Transmission"
                      className={classes.infoImg}
                    />
                    <span>
                      <div className={classes.infoImgHeading}>
                        Manual Transmission
                      </div>
                      <span className={classes.infoImgText}>
                        6 Speed Manual Transmission
                      </span>
                    </span>
                  </div>
                )}
                <Divider />
                <div
                  className={classnames(
                    classes.milesPriceContainer,
                    classes.hoverCursor
                  )}
                  onClick={() => setSpecShown(!isSpecShown)}
                >
                  <span className={classes.dropdownHeading}>
                    Features & Specs
                  </span>
                  {isSpecShown ? <ArrowDropDownIcon /> : <ArrowUpIcon />}
                </div>
                {isSpecShown ? (
                  <div
                    className={classnames(
                      classes.milesPriceContainer,
                      classes.hoverCursor
                    )}
                  >
                    Features
                  </div>
                ) : null}
                {isSpecShown ? (
                  <div
                    className={classnames(
                      classes.milesPriceContainer,
                      classes.hoverCursor
                    )}
                  >
                    Specifications
                  </div>
                ) : null}

                <Divider />
                <div className={classes.contactNumber}>
                  Call <span className={classes.phoneNumber}>864-804-7528</span>
                </div>
              </Paper>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
