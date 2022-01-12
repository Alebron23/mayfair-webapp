import { reducer as formReducer } from "redux-form"
import { configureStore } from "@reduxjs/toolkit"
import { api } from "./services/api"

import vehicles from "./vehicles/reducer"
import notifications from "./notifications/reducer"
import auth from "./auth/reducer"

const store = configureStore({
  reducer: {
    vehicles,
    notifications,
    auth,
    form: formReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
})

export default store
