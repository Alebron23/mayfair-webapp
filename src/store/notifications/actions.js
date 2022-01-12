export const actions = {
  addNotif: "notifs/add_notif",
  removeNotif: "notifs/remove_notif",
};

export const addNotif = (id, message, type) => ({
  type: actions.addNotif,
  payload: { message, id, type },
});

export const removeNotif = (id) => ({
  type: actions.removeNotif,
  payload: { id },
});
