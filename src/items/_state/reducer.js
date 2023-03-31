import { rSet } from "Common"

function ItemsReducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH_QUERY": {
      return rSet("searchQuery", action, state)
    }

    case "SET_HAS_STOREFRONT_SELECTIONS": {
      return rSet("hasStorefrontSelections", action, state)
    }

    case "SET_NOTICE": {
      return rSet("notice", action, state)
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type} in ItemsReducer`)
    }
  }
}

export default ItemsReducer
