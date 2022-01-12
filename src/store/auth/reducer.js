import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  hasAccount: true,
  token: null,
  pathname: "",
  isAuthed: "",
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setHasAccount(state, action) {
      state.hasAccount = action.payload
    },
    setIsAuthed(state, action) {
      state.isAuthed = action.payload
    },
  },
})

export const { setHasAccount, setIsAuthed } = authSlice.actions

export default authSlice.reducer

// Selectors
const selectAuth = state => state.auth
export const selectAuthHasAccount = state => selectAuth(state).hasAccount
export const selectIsAuthed = state => selectAuth(state).isAuthed
