import _get from "lodash/get";

export const selectAllVehicles = (state) => {
  return _get(state, "vehicles.data");
};

export const selectVehicleSearch = (state) => {
  return _get(state, "vehicles.searching");
};
