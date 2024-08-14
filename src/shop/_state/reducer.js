import { rSet, rErr } from "@shopwp/common"
import update from "immutability-helper"
import { maybeSetCache } from "@shopwp/api"

function forceCartTabbing(isOpeningCart) {
  const cartElement = document.querySelector(".swp-cart-container")

  const focusableElements =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  const firstFocusableElement =
    cartElement.querySelectorAll(focusableElements)[0]
  const focusableContent = cartElement.querySelectorAll(focusableElements)
  const lastFocusableElement = focusableContent[focusableContent.length - 1]

  function onKeyDown(e) {
    let isTabPressed = e.key === "Tab" || e.keyCode === 9

    if (!isTabPressed) {
      return
    }

    if (e.shiftKey) {
      // if shift key pressed for shift + tab combination
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus() // add focus for the last focusable element
        e.preventDefault()
      }
    } else {
      // if tab key is pressed
      if (document.activeElement === lastFocusableElement) {
        // if focused has reached to last focusable element then focus first focusable element after pressing tab
        firstFocusableElement.focus() // add focus for the first focusable element
        e.preventDefault()
      }
    }
  }

  if (!isOpeningCart) {
    document.removeEventListener("keydown", onKeyDown)
  } else {
    document.addEventListener("keydown", onKeyDown)

    firstFocusableElement.focus()
  }
}

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

      forceCartTabbing(action.payload)

      wp.hooks.doAction("on.cartToggle", action.payload, updatedShopState)

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
