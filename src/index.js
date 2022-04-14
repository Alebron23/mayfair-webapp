import React from "react";
import { render, hydrate } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Notifications from "./components/Notifications";
import VehicleList from "./components/VehicleList";
import VehicleDetail from "./components/VehicleDetail";
import EditVehicle from "./components/EditVehicle";
import CreditApp from "./components/CreditApp";
import PaymentsCalculator from "./components/PaymentsCalculator";
import AboutPage from "./components/About";
import UploadsPage from "./components/VehicleUploads";
import Login from "./components/Auth";
import CheckAuth from "./components/Auth/CheckAuth";
import AssetsUpload from "./components/VehicleUploads/Assets";

import "./index.css";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
import WithLayout from "./WithLayout";
import MainLayout from "./layouts";
console.log(WithLayout);
const App = () => {
  return (
    <Provider store={store}>
      <React.StrictMode>
        <Router>
          <CheckAuth />
          <Notifications />
          <Switch>
            <Route
              path="/"
              exact
              render={(matchProps) => (
                <WithLayout
                  {...matchProps}
                  component={VehicleList}
                  layout={MainLayout}
                />
              )}
            />
            <Route
              path="/vehicle"
              render={(matchProps) => (
                <WithLayout
                  {...matchProps}
                  component={VehicleDetail}
                  layout={MainLayout}
                />
              )}
            />
            <Route
              path="/info"
              exact
              render={(matchProps) => (
                <WithLayout
                  {...matchProps}
                  component={AboutPage}
                  layout={MainLayout}
                />
              )}
            />
            <Route
              exact
              path="/credit-app"
              render={(matchProps) => (
                <WithLayout
                  {...matchProps}
                  component={CreditApp}
                  layout={MainLayout}
                />
              )}
            />
            <Route
              exact
              path="/payments-calculator"
              render={(matchProps) => (
                <WithLayout
                  {...matchProps}
                  component={PaymentsCalculator}
                  layout={MainLayout}
                />
              )}
            />
            <Route
              exact
              path="/uploads"
              render={(matchProps) => (
                <WithLayout
                  {...matchProps}
                  component={UploadsPage}
                  layout={MainLayout}
                />
              )}
            />

            <Route
              exact
              path="/login"
              render={(matchProps) => (
                <WithLayout
                  {...matchProps}
                  component={Login}
                  layout={MainLayout}
                />
              )}
            />
            <Route
              exact
              path="/uploads/assets"
              render={(matchProps) => (
                <WithLayout
                  {...matchProps}
                  component={AssetsUpload}
                  layout={MainLayout}
                />
              )}
            />
            <Route
              path="/edit"
              render={(matchProps) => (
                <WithLayout
                  {...matchProps}
                  component={EditVehicle}
                  layout={MainLayout}
                />
              )}
            />
          </Switch>
        </Router>
      </React.StrictMode>
    </Provider>
  );
};

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);

  // Look into this on react-snap to get service workers working with it.
  // Also have issue where it's not indexing all the pages. Tried putting a tag in
  // AppBar LinkItems but it didn't work.
  // https://github.com/stereobooster/react-snap/blob/88ef70dd419158c18b9845034513dc84a3e100d9/doc/recipes.md#configure-sw-precache-without-ejecting

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.register();
} else {
  render(<App />, rootElement);
}
