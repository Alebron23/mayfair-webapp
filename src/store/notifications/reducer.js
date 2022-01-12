import { actions as notifActions } from "./actions"

const initialState = {
  data: [],
}

function notificationReducer(state, action) {
  if (typeof state === "undefined") {
    return initialState
  }

  switch (action.type) {
    case notifActions.addNotif:
      return {
        ...state,
        data: [...state.data, action.payload],
      }

    case notifActions.removeNotif:
      const newData = state.data.filter(notif => {
        return notif.id !== action.payload.id
      })

      return {
        ...state,
        data: newData,
      }

    default:
      return state
  }
}

export default notificationReducer
