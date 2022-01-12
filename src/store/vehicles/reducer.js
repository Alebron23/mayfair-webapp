import { actions as vehicleActions } from "./actions";

const initialState = {
  data: [
    {
      year: "2012",
      make: "Dodge",
      model: "2500 SLT",
      price: "18,800",
      miles: "167k",
      img: "dodge1_wlYyajzM2.jpg",
      sold: true,
    },
    {
      year: "2010",
      make: "Ford",
      model: "F-150 XLT",
      price: "14,000",
      miles: "145k",
      img: "silverFord_UIEROTjoEI.jpg",
      sold: true,
    },
    {
      year: "2011",
      make: "Chevy",
      model: "1500 LT",
      price: "17,800",
      miles: "115k",
      img: "greyChevy__-S4TDFRsD.jpg",
      sold: true,
    },
    {
      year: "2013",
      make: "GMC",
      model: "1500 SLE",
      price: "20,000",
      miles: "145k",
      img: "redGMC_YlVkOOPch.jpg",
      sold: true,
    },
    {
      year: "2010",
      make: "Ford",
      model: "F-350 Lariat",
      price: "20,000",
      miles: "150k",
      img: "whiteFord_50avclA-T.jpg",
      sold: true,
    },
    {
      year: "2005",
      make: "Toyota",
      model: "4runner SR5",
      price: "10,000",
      miles: "121k",
      img: "4runner_Ojrtw6O_2m.jpg",
      sold: true,
    },
    {
      year: "2013",
      make: "Chevy",
      model: "1500 LTZ",
      price: "17,800",
      miles: "167k",
      img: "redChevy__Oc8GTzeL.jpg",
      sold: true,
    },
    {
      year: "2008",
      make: "BMW",
      model: "328i",
      price: "4,400",
      miles: "136k",
      img: "bmw_v-VxwHMuXk.jpg",
      sold: true,
    },
  ],
  searching: false,
};

function vehicleReducer(state, action) {
  if (typeof state === "undefined") {
    return initialState;
  }

  switch (action.type) {
    case vehicleActions.searching:
      return {
        ...state,
        searching: action.payload.isSearching,
      };

    default:
      return state;
  }
}

export default vehicleReducer;
