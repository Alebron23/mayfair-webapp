import _get from "lodash/get";
import { createSelector } from "reselect";

export const selectAllNotifs = (state) => {
  return _get(state, "notifications.data");
};

export const selectNotifById = (id) =>
  createSelector([selectAllNotifs], (notifs) => {
    return notifs[id];
  });
