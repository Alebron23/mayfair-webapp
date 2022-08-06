import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import ImageGallery from "react-image-gallery";
import CircularProgress from "@material-ui/core/CircularProgress";
import WarningIcon from "@material-ui/icons/Warning";

// Img
import CarLove from "../../imgs/carlove.png";
import FourWheel from "../../imgs/fourwheel.png";
import Owner from "../../imgs/owner.png";
import ManualTrans from "../../imgs/manualLogo.png";

// Redux
import { useVehicleQuery, baseEndpoint } from "../../store/services/api";

// User Imports
import DetailPane from "../common/DetailPane";
import { GradientButton } from "../common/Buttons";
import { redGradient } from "../common/Buttons";

const useStyles = makeStyles((theme) => {
  return createStyles({
    outerWrapper: {
      position: "relative",
      margin: "0 auto",
    },
    root: {
      width: "100%",
      display: "flex",
      boxSizing: "border-box",
      justifyContent: "center",
      flexDirection: "column",
    },
    imgGalleryWrapper: {
      width: "100%",
      position: "relative",
      marginBottom: 16,
    },
    imgContainer: {
      width: "100%",
      height: "auto",
    },
    vehiclePic: {
      width: "100%",
      height: "auto",
      borderRadius: 15,
    },
    loadingContainer: {
      width: "100%",
      height: "450px",
      border: "1px solid grey",
      borderRadius: 5,
    },
    imgSpinner: {
      width: "50px !important",
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

      // "@media only screen and (min-width: 900px)": {
      //   width: "38%",
      //   marginTop: 0,
      //   marginLeft: 16,
      //   overflowY: "auto",
      // },
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
      wordBreak: "break-all",
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
    gradientHeader: {
      fontWeight: "bold",
      fontSize: 18,
      margin: "8px 0 0 8px",
      backgroundImage: `${redGradient}`,
      backgroundColor: "red",
      backgroundSize: "100%",
      backgroundRepeat: "repeat",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      MozBackgroundClip: "text",
      MozTextFillColor: "transparent",
    },
  });
});

export default function VehicleDetail() {
  const classes = useStyles();
  let history = useHistory();

  const vehicleId = history.location.pathname.split("/")[2];
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const { data: vehicle = [] } = useVehicleQuery(vehicleId);

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
              setLoading(false);
            }
          }}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
      </div>
    );
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
                  justifyContent="center"
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
                    justifyContent="center"
                    direction="column"
                  >
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
                            original: `${baseEndpoint}/vehicles/pics/${id}`,
                            thumbnail: `${baseEndpoint}/vehicles/pics/${id}`,
                            renderItem: Item,
                            ind: i,
                          }))}
                        />
                      </>
                    )}
                  </div>
                )}
              </div>

              <DetailPane
                title={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              >
                <div className={classes.milesPriceContainer}>
                  <span>
                    <span>${(vehicle.price * 1).toLocaleString("en-US")}</span>
                    <div
                      className={classes.payment}
                      onClick={(e) => {
                        e.stopPropagation();
                        history.push("/payments-calculator");
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
                <div className={classes.contactNumber}>
                  <GradientButton size="small" href="tel:+1-864-804-7528">
                    Call Now
                  </GradientButton>
                </div>
              </DetailPane>

              <DetailPane title="Details">{vehicle.description}</DetailPane>

              <DetailPane title="Mechanical">
                <span className={classes.gradientHeader}>General</span>
                <ul style={{ paddingLeft: 24 }}>
                  <li>N54B30 3.0L Engine</li>
                  <li>GS6 6SPD Manual </li>
                </ul>

                {/* vehicle.upgrades ? <h4 style={{ margin: 0 }}>Upgrades</h4> : null */}
                <span className={classes.gradientHeader}>Upgrades</span>
                <ul style={{ paddingLeft: 24 }}>
                  <li>PURE600 N54 Upgrade Turbos </li>
                  <li>e93 M3 Differential</li>
                  <li>Stage 3 Performance Twin Disc Clutch Kit</li>
                </ul>
              </DetailPane>

              <DetailPane title="Body">
                <span className={classes.gradientHeader}>General</span>
                <ul style={{ paddingLeft: 24 }}>
                  <li>Body is great shape overall.</li>
                  <li>
                    A few blemishes but for a 2007 car it's in good shape.
                  </li>
                  <li>Looks sharp.</li>
                </ul>

                <span className={classes.gradientHeader}>Upgrades</span>
                <ul style={{ paddingLeft: 24 }}>
                  <li>M3 front bumper.</li>
                  <li>Carbon fiber rear diffuser.</li>
                </ul>
              </DetailPane>

              <DetailPane title="Interior">
                <ul style={{ paddingLeft: 24 }}>
                  <li>
                    Sport package black leather interior with silver trim.{" "}
                  </li>
                  <li>
                    Interior is in very good condition and looks new for the
                    model year.{" "}
                  </li>
                  <li>Display in dash. </li>
                </ul>
              </DetailPane>

              <DetailPane title="Additional Info">
                <ul style={{ paddingLeft: 24 }}>
                  <li>Apex 18" rims </li>
                  <li>New Continental tires</li>
                  <li>M3 Front bumper</li>
                  <li>Carbon Fiber Rear Diffuser </li>
                </ul>
              </DetailPane>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
