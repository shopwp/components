import { rSet, rErr } from "@shopwp/common"
import update from "immutability-helper"
import { maybeSetCache } from "@shopwp/api"

function ShopReducer(state, action) {
  switch (action.type) {
    case "UPDATE_BUYER_IDENTITY": {
      return {
        ...state,
        buyerIdentity: update(state.buyerIdentity, { $merge: action.payload }),
      }
    }

    case "TOGGLE_CART": {
      const updatedShopState = rSet("isCartOpen", action, state)

      wp.hooks.doAction("on.cartToggle", updatedShopState)

      return updatedShopState
    }

    case "SET_IS_CART_READY": {
      return rSet("isCartReady", action, state)
    }

    case "SET_IS_CART_UPDATING": {
      return rSet("isCartUpdating", action, state)
    }

    case "SET_CART_DATA": {
      const updatedShopState = rSet("cartData", action, state)

      if (action.payload) {
        maybeSetCache({
          cacheType: "cart",
          dataToHash: action.payload.id,
          dataToCache: action.payload,
        })
      }

      wp.hooks.doAction("on.cartUpdate", updatedShopState)

      return updatedShopState
    }

    case "SET_TRANSLATIONS": {
      return rSet("t", action, state)
    }

    case "SET_DIRECT_CHECKOUT_ERROR": {
      return rSet("directCheckoutError", action, state)
    }

    case "SET_PRODUCTS_VISIBLE": {
      return rSet("productsVisible", action, state)
    }

    case "SET_TRACKING_PARAMS": {
      return rSet("trackingParams", action, state)
    }

    default: {
      rErr(action, "Shop")
    }
  }
}

export default ShopReducer
