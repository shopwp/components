import update from "immutability-helper"
import { rSet, rErr } from "@shopwp/common"

function ProductBuyButtonReducer(state, action) {
  switch (action.type) {
    case "SET_SUBSCRIPTIONS": {
      return rSet("subscriptions", action, state)
    }

    case "SET_NOTICE": {
      return rSet("notice", action, state)
    }

    case "UPDATE_SELECTED_OPTIONS": {
      if (state.selectedOptions === false || action.payload === false) {
        return {
          ...state,
          selectedOptions: update(state.selectedOptions, {
            $set: action.payload,
          }),
        }
      }

      return {
        ...state,
        selectedOptions: update(state.selectedOptions, {
          $merge: action.payload,
        }),
      }
    }

    default: {
      rErr(action, "ProductBuyButton")
    }
  }
}

export default ProductBuyButtonReducer
