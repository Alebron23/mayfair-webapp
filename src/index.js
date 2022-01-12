import React from "react"
import { render, hydrate } from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Notifications from "./components/Notifications"
import AppBar from "./components/AppBar"
import VehicleList from "./components/VehicleList"
import VehicleDetail from "./components/VehicleDetail"
import EditVehicle from "./components/EditVehicle"
import CreditApp from "./components/CreditApp"
import PaymentsCalculator from "./components/PaymentsCalculator"
import AboutPage from "./components/About"
import UploadsPage from "./components/VehicleUploads"
import Login from "./components/Auth"
import CheckAuth from "./components/Auth/CheckAuth"
import AssetsUpload from "./components/VehicleUploads/Assets"

import "./index.css"
import * as serviceWorker from "./serviceWorker"
import store from "./store"

const App = () => {
  return (
    <Provider store={store}>
      <React.StrictMode>
        <Router>
          <CheckAuth />
          <AppBar />

          <Notifications />
          <Switch>
            <Route path="/" exact>
              <VehicleList />
            </Route>
            <Route path="/vehicle">
              <VehicleDetail />
            </Route>
            <Route path="/info">
              <AboutPage />
            </Route>
            <Route path="/credit-app">
              <CreditApp />
            </Route>
            <Route path="/payments-calculator">
              <PaymentsCalculator />
            </Route>
            <Route exact path="/uploads">
              <UploadsPage />
            </Route>

            <Route path="/login">
              <Login />
            </Route>
            <Route path="/uploads/assets">
              <AssetsUpload />
            </Route>
            <Route path="/edit">
              <EditVehicle />
            </Route>
          </Switch>
        </Router>
      </React.StrictMode>
    </Provider>
  )
}

const rootElement = document.getElementById("root")

if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement)

  // Look into this on react-snap to get service workers working with it.
  // Also have issue where it's not indexing all the pages. Tried putting a tag in
  // AppBar LinkItems but it didn't work.
  // https://github.com/stereobooster/react-snap/blob/88ef70dd419158c18b9845034513dc84a3e100d9/doc/recipes.md#configure-sw-precache-without-ejecting

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.register()
} else {
  render(<App />, rootElement)
}

// "proxy": "http://localhost:9000",
