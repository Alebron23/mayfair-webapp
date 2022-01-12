import React, { useEffect } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { useLocation } from "react-router-dom"
import _has from "lodash/has"

import { setIsAuthed, selectIsAuthed } from "../../store/auth/reducer"

function CheckAuth({ setIsAuthed }) {
  const location = useLocation()
  const pathname = location.pathname

  useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get("http://localhost:9000/users/authed-user", {
          withCredentials: true,
        })

        if (_has(res, "data.isAuthed")) {
          setIsAuthed(res.data.isAuthed)
        }
      } catch (err) {
        console.log("check auth error:", err)
      }
    })()
    // TODO: does pathname need to be referenced in
  }, [])

  return <div />
}

const mapStateToProps = state => {
  return {
    isLoggedIn: selectIsAuthed(state),
  }
}

const CheckAuthWrapper = connect(mapStateToProps, {
  setIsAuthed,
})(CheckAuth)

export default CheckAuthWrapper
