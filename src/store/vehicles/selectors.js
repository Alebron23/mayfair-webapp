import _get from "lodash/get";
import { createSelector } from "reselect";

export const selectAllVehicles = (state) => {
  return _get(state, "vehicles.data");
};

export const selectVehicleSearch = (state) => {
  return _get(state, "vehicles.searching");
};
