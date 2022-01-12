export const actions = {
  searching: "vehicles/searching",
};

export const setSearching = (isSearching) => ({
  type: actions.searching,
  payload: { isSearching },
});
