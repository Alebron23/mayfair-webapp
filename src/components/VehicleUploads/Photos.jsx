import React, { useEffect, useState, useRef } from "react"
import _has from "lodash/has"
import { v4 as uuidv4 } from "uuid"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import { connect } from "react-redux"
import Grid from "@material-ui/core/Grid"
import PicIcon from "@material-ui/icons/AddAPhoto"
import CancelIcon from "@material-ui/icons/Cancel"
import CircularProgress from "@material-ui/core/CircularProgress"

// User imports
import { addNotif } from "../../store/notifications/actions"
import { useDeletePicMutation, usePicQuery } from "../../store/services/api"
import DeleteDialog from "./DeleteDialog"

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: "100%",
    },
    picContainer: {
      overflowX: "hidden",
      overflowY: "auto",
      border: "1px solid grey",
      width: "100%",
      maxWidth: 1200,
      height: 400,
      maxHeight: 1200,
      borderRadius: 5,

      "@media only screen and (min-width: 600px)": {
        height: 700,
      },

      "-ms-overflow-style": "none" /* for Internet Explorer, Edge */,
      "scrollbar-width": "none",
      "&::-webkit-scrollbar": {
        display: "none" /* for Chrome, Safari, and Opera */,
      },
    },
    pic: {
      borderRadius: 8,
      width: "100%",
      height: "100%",
    },
    uploadPlaceholder: {
      height: "auto",
      borderRadius: 8,
      backgroundColor: "whitesmoke",

      "&:hover": {
        backgroundColor: "gainsboro",
        cursor: "pointer",
      },
    },
    uploadPlaceholderItems: {
      display: "block",
      margin: "0 auto",
    },
    gridPic: {
      height: "50%",
      overflow: "hidden",
      position: "relative",
      borderRadius: 16,
    },
    imgBtn: {
      display: "block",
      position: "absolute",
      top: 4,
      left: 4,
      color: "white",

      "&:hover": {
        cursor: "pointer",
        color: "gainsboro",
      },
    },
    spinner: {
      position: "absolute",
    },
  })
)

const imgId = uuidv4()

function Pic({ pic, onRemovePic, setPics, isUpdateForm }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const { id } = pic

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Grid
      item
      xs={12}
      md={6}
      key={id}
      className={classes.gridPic}
      container
      alignItems="center"
      justify="center"
    >
      <img
        className={classes.pic}
        src={pic.url}
        alt="car picture"
        onLoad={() => {
          setPics(statePics =>
            statePics.map(statePic =>
              statePic.id === id ? { ...statePic, loading: false } : statePic
            )
          )
        }}
        onError={() => {
          // TODO: Add error state?
          console.log("IMAGE FAILED TO LOAD")
        }}
      />
      <CancelIcon
        className={classes.imgBtn}
        onClick={() => {
          if (isUpdateForm) {
            handleClickOpen()
          } else {
            onRemovePic(id)
          }
        }}
      />
      {pic.loading && <CircularProgress className={classes.spinner} />}
      <DeleteDialog
        onRemovePic={onRemovePic}
        open={open}
        handleClose={handleClose}
        id={id}
      />
    </Grid>
  )
}

function PhotoInput({
  pics,
  setPics,
  isUpdateForm,
  addNotification,
  vehicleId,
  vehiclePics = [],
  refetch,
}) {
  const classes = useStyles()
  const inputEl = useRef(null)
  const [deletePic, { isLoading }] = useDeletePicMutation()

  const onFileSelected = e => {
    const inputPics = Object.values(e.target.files)
    const transformedPics = inputPics.map(inputPic => {
      return {
        id: uuidv4(),
        url: URL.createObjectURL(inputPic),
        file: inputPic,
      }
    })

    setPics(statePics => [...statePics, ...transformedPics])
  }

  const onRemovePic = async id => {
    if (isUpdateForm && vehiclePics.includes(id)) {
      setPics(pics => {
        return pics.map(pic => {
          return { ...pic, loading: pic.id === id }
        })
      })

      try {
        const res = await deletePic({ picId: id, vehicleId })
        if (_has(res, "data.vehicleId")) {
          setPics(newPics => newPics.filter(pic => pic.id !== id))
          addNotification("picDelete", "Picture Delete Success", "success")
          refetch()
        }
      } catch (err) {
        console.log("DELTE ERR:", err)
        addNotification("picDelete", "Error deleting Picture", "error")
        setPics(pics => {
          return pics.map(pic => {
            return { ...pic, loading: pic.id === id ? false : pic.loading }
          })
        })
      }
    } else {
      setPics(pics.filter(pic => pic.id !== id))
    }
  }

  const grids = pics.map(pic => {
    return (
      <Pic
        key={pic.id}
        pic={pic}
        id={pic.id}
        onRemovePic={onRemovePic}
        refetch={refetch}
        setPics={setPics}
        isUpdateForm={isUpdateForm}
      />
    )
  })

  return (
    <>
      <input
        type="file"
        multiple
        className={classes.fileInput}
        onChange={onFileSelected}
        style={{ padding: 20, display: "none" }}
        ref={inputEl}
        name="uploaded_files"
      ></input>
      <Grid
        className={classes.picContainer}
        container
        item
        spacing={1}
        style={{ padding: !!(pics && pics.length) ? 4 : 8 }}
      >
        {!!(pics && pics.length) ? (
          [
            ...grids,
            <Grid
              container
              item
              xs={12}
              md={grids.length % 2 === 1 ? 6 : 12}
              style={{ height: "50%", padding: 4 }}
              key={imgId}
            >
              <Grid
                className={classes.uploadPlaceholder}
                onClick={() => inputEl.current.click()}
                item
                xs={12}
                container
                justify="center"
                alignItems="center"
              >
                <div>
                  <PicIcon className={classes.uploadPlaceholderItems} />
                  <h3 className={classes.uploadPlaceholderItems}>Add Photos</h3>
                </div>
              </Grid>
            </Grid>,
          ]
        ) : (
          <Grid
            className={classes.uploadPlaceholder}
            onClick={() => inputEl.current.click()}
            item
            container
            justify="center"
            alignItems="center"
          >
            <div>
              <PicIcon className={classes.uploadPlaceholderItems} />
              <h3 className={classes.uploadPlaceholderItems}>Add Photos</h3>
            </div>
          </Grid>
        )}
      </Grid>
    </>
  )
}

const mapStateToProps = state => {
  return {}
}

const PhotoInputWrapper = connect(mapStateToProps, {
  addNotification: addNotif,
})(PhotoInput)

export default PhotoInputWrapper
