import update from "immutability-helper"
import { rSet, rErr } from "@shopwp/common"

function ProductReducer(state, action) {
  switch (action.type) {
    case "SET_MISSING_SELECTIONS": {
      return rSet("missingSelections", action, state)
    }

    case "UPDATE_QUANTITY": {
      return rSet("quantity", action, state)
    }

    case "SET_PAYLOAD": {
      return rSet("payload", action, state)
    }

    case "SET_IS_DIRECT_CHECKOUT": {
      return rSet("isDirectCheckingOut", action, state)
    }

    case "SET_SELECTED_SUBSCRIPTION": {
      return rSet("selectedSubscription", action, state)
    }

    case "SET_SUBSCRIPTION_PRICING": {
      return rSet("subscriptionPricing", action, state)
    }

    case "TOGGLE_MODAL": {
      return rSet("isModalOpen", action, state)
    }

    case "SET_ACTIVE_SELLING_GROUP": {
      return rSet("activeSellingGroup", action, state)
    }

    case "SET_NOTICE": {
      return rSet("notice", action, state)
    }

    case "SET_SELECTED_VARIANT": {
      if (!action.payload) {
        return {
          ...state,
          selectedVariant: false,
        }
      }

      const variant = action.payload

      if (variant) {
        wp.hooks.doAction("on.allVariantsSelected", variant)
      }

      return {
        ...state,
        selectedVariant: variant,
      }
    }

    case "SET_ADDED_VARIANT": {
      return {
        ...state,
        addedToCart: update(state.addedToCart, {
          $set: { variant: action.payload, at: new Date() },
        }),
      }
    }

    default: {
      rErr(action, "Product")
    }
  }
}

export default ProductReducer
