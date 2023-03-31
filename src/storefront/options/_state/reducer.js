import { rSet } from "Common"

function StorefrontOptionsReducer(state, action) {
  switch (action.type) {
    case "SET_IS_BOOTSTRAPPING": {
      return rSet("isBootstrapping", action, state)
    }

    case "SET_FILTER_OPTIONS": {
      return rSet("filterOptions", action, state)
    }

    default: {
      throw new Error(
        `Unhandled action type: ${action.type} in StorefrontOptionsReducer`
      )
    }
  }
}

export default StorefrontOptionsReducer
