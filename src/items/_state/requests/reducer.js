import update from "immutability-helper"
import { rSet, rErr } from "@shopwp/common"

function RequestsReducer(state, action) {
  switch (action.type) {
    case "SET_IS_LOADING": {
      return rSet("isLoading", action, state)
    }

    case "SET_IS_FETCHING_NEW": {
      return rSet("isFetchingNew", action, state)
    }

    case "SET_IS_REPLACING": {
      return rSet("isReplacing", action, state)
    }

    case "SET_IS_BOOTSTRAPPING": {
      return rSet("isBootstrapping", action, state)
    }

    case "SET_HAS_NEXT_PAGE": {
      return rSet("hasNextPage", action, state)
    }

    case "SET_HAS_PREVIOUS_PAGE": {
      return rSet("hasPreviousPage", action, state)
    }

    case "SET_CURSOR": {
      return rSet("cursor", action, state)
    }

    case "UPDATE_TOTAL_SHOWN": {
      const newTotal = action.payload + state.totalShown

      return {
        ...state,
        totalShown: update(state.totalShown, { $set: newTotal }),
      }
    }

    case "SET_QUERY_TYPE": {
      return rSet("queryType", action, state)
    }

    case "SET_QUERY_PARAMS": {
      return rSet("queryParams", action, state)
    }

    case "SET_WITH_PRODUCTS": {
      return rSet("withProducts", action, state)
    }

    case "RESET_QUERY_PARAMS": {
      var newParams = update(state.queryParams, {
        $set: state.originalParams,
      })

      return {
        ...state,
        queryParams: newParams,
      }
    }

    default: {
      rErr(action, "Requests")
    }
  }
}

export default RequestsReducer
