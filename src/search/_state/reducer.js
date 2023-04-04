import update from "immutability-helper"
import { rSet } from "@shopwp/common"

function SearchReducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH_TERM": {
      return rSet("searchTerm", action, state)
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type} in SearchReducer`)
    }
  }
}

export default SearchReducer
