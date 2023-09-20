import { to } from "@shopwp/common"
import {
  getCart,
  createCart,
  addLineItems,
  updateLineItems,
  removeLineItems,
  updateCartAttributes,
  maybeHandleApiError,
  applyDiscount,
  updateNote,
  updateBuyerIdentity,
} from "@shopwp/api"
import { checkoutRedirect } from "@shopwp/common"
import Cookies from "js-cookie"

function hasDiscount(cartData) {
  if (!cartData.discountCodes) {
    return false
  }

  var appliedDiscounts = cartData.discountCodes.filter(
    (discount) => discount.applicable
  )

  if (!appliedDiscounts.length) {
    return false
  }

  return appliedDiscounts[0].code
}

async function updateLines(
  shopState,
  cartDispatch,
  shopDispatch,
  lineItem,
  newQuantity
) {
  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: true })

  const [updateError, response] = await to(
    updateLineItems({
      cartId: shopState.cartData.id,
      lines: {
        id: lineItem.id,
        quantity: newQuantity,
      },
      buyerIdentity: shopState.buyerIdentity,
    })
  )

  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: false })

  var maybeApiError = maybeHandleApiError(updateError, response)

  if (maybeApiError) {
    cartDispatch({
      type: "SET_NOTICE",
      payload: {
        type: "error",
        message: maybeApiError,
      },
    })
    return
  }

  shopDispatch({
    type: "SET_CART_DATA",
    payload: response.data,
  })
}

async function removeLines(lineItemIds, shopState, cartDispatch, shopDispatch) {
  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: true })

  const [error, response] = await to(
    removeLineItems({
      lineIds: lineItemIds,
      cartId: shopState.cartData.id,
      buyerIdentity: shopState.buyerIdentity,
    })
  )

  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: false })

  var maybeApiError = maybeHandleApiError(error, response)

  if (maybeApiError) {
    cartDispatch({
      type: "SET_NOTICE",
      payload: {
        type: "error",
        message: maybeApiError,
      },
    })

    return
  }

  shopDispatch({
    type: "SET_CART_DATA",
    payload: response.data,
  })
}

async function addLines(data, cartDispatch, shopDispatch) {
  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: true })

  const [addError, response] = await to(addLineItems(data))

  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: false })

  var maybeApiError = maybeHandleApiError(addError, response)

  if (maybeApiError) {
    cartDispatch({
      type: "SET_NOTICE",
      payload: {
        type: "error",
        message: maybeApiError,
      },
    })

    return
  }

  wp.hooks.doAction("on.afterAddToCart", data.lines, response.data)

  shopDispatch({
    type: "SET_CART_DATA",
    payload: response.data,
  })
}

async function updateAttrs(data, shopState, cartDispatch, shopDispatch) {
  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: true })

  const [addError, response] = await to(
    updateCartAttributes({
      attributes: data,
      cartId: shopState.cartData.id,
      buyerIdentity: shopState.buyerIdentity,
    })
  )

  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: false })

  var maybeApiError = maybeHandleApiError(addError, response)

  if (maybeApiError) {
    cartDispatch({
      type: "SET_NOTICE",
      payload: {
        type: "error",
        message: maybeApiError,
      },
    })
    return
  }

  shopDispatch({
    type: "SET_CART_DATA",
    payload: response.data,
  })
}

async function getExistingCart(
  cartId,
  cartState,
  shopState,
  cartDispatch,
  shopDispatch
) {
  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: true })

  const [getCartError, response] = await to(
    getCart(
      wp.hooks.applyFilters(
        "cart.getExistingSettings",
        {
          id: cartId,
          buyerIdentity: shopState.buyerIdentity,
        },
        cartState,
        shopState
      )
    )
  )

  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: false })

  var maybeApiError = maybeHandleApiError(getCartError, response)

  if (maybeApiError) {
    console.warn("ShopWP Error: ", maybeApiError)
    localStorage.removeItem("shopwp-cart-id")

    if (!response || response.data.includes("No cart data found")) {
      createNewCart(cartState, shopState, cartDispatch, shopDispatch)
    }

    return
  }

  shopDispatch({
    type: "SET_CART_DATA",
    payload: response.data,
  })

  var discount = hasDiscount(response.data)

  if (discount) {
    cartDispatch({
      type: "SET_DISCOUNT_CODE",
      payload: discount,
    })
  }

  cartDispatch({ type: "SET_CART_NOTE", payload: response.data.note })

  wp.hooks.doAction("on.cartLoad", cartState)
}

async function createNewCart(cartState, shopState, cartDispatch, shopDispatch) {
  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: true })

  const [createCartError, response] = await to(
    createCart(
      wp.hooks.applyFilters(
        "cart.createSettings",
        {
          note: "",
          buyerIdentity: shopState.buyerIdentity,
        },
        cartState,
        shopState
      )
    )
  )

  wp.hooks.doAction("on.cartLoad", cartState)

  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: false })

  var maybeApiError = maybeHandleApiError(createCartError, response)

  if (maybeApiError) {
    console.warn("ShopWP Error: ", maybeApiError)
    shopDispatch({
      type: "SET_CART_DATA",
      payload: false,
    })
  } else {
    shopDispatch({
      type: "SET_CART_DATA",
      payload: response.data,
    })

    localStorage.setItem("shopwp-cart-id", response.data.id)
  }
}

async function directCheckout(
  data,
  cartState,
  cartDispatch,
  shopState,
  shopDispatch
) {
  const [directCheckoutError, response] = await to(
    createCart(
      wp.hooks.applyFilters(
        "cart.directCheckoutSettings",
        {
          lines: data.lines,
          discountCodes: data?.discountCodes ? data.discountCodes : [],
          note: data?.note ? data.note : "",
          attributes: data?.attributes ? data.attributes : [],
          buyerIdentity: shopState.buyerIdentity,
        },
        cartState,
        data
      )
    )
  )

  var maybeApiError = maybeHandleApiError(directCheckoutError, response)

  if (maybeApiError) {
    cartDispatch({ type: "SET_IS_CHECKING_OUT", payload: false })
    shopDispatch({ type: "TOGGLE_CART", payload: true })
    return
  }

  if (data.settings && data.settings.linkTarget) {
    var linkTarget = data.settings.linkTarget
  } else {
    var linkTarget = false
  }

  checkoutRedirect({
    checkoutUrl: response.data.checkoutUrl,
    trackingParams: shopState.trackingParams,
    target: linkTarget,
  })
}

function combineDiscounts(shopState, discountToAdd) {
  var newDiscountCodesToAdd = [discountToAdd]

  if (shopState.cartData.discountCodes.length) {
    var currentlyAppliedCodes = shopState.cartData.discountCodes.map(
      (ds) => ds.code
    )
  } else {
    var currentlyAppliedCodes = []
  }

  return currentlyAppliedCodes.concat(newDiscountCodesToAdd)
}
function subtractDiscounts(shopState, discountToRemove) {
  var newlist = shopState.cartData.discountCodes.filter(
    (d) => d.code !== discountToRemove
  )
  return newlist.map((ds) => ds.code)
}

async function updateDiscount(
  cartDispatch,
  shopState,
  discount,
  shopDispatch,
  afterUpdatingDiscount = false,
  shouldRemove = false
) {
  cartDispatch({
    type: "SET_NOTICE",
    payload: false,
  })

  if (!discount && discount !== "") {
    cartDispatch({
      type: "SET_NOTICE",
      payload: {
        type: "warning",
        message: shopState.t.n.noDiscountFound,
      },
    })
    return
  }

  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: true })
  cartDispatch({ type: "SET_IS_ADDING_DISCOUNT_CODE", payload: true })

  if (shouldRemove) {
    var finalDiscountCodes = subtractDiscounts(shopState, discount)
  } else {
    var finalDiscountCodes = combineDiscounts(shopState, discount)
  }

  var discountOptions = {
    cartId: shopState.cartData.id,
    discountCodes: finalDiscountCodes,
    buyerIdentity: shopState.buyerIdentity,
  }

  const [errorDiscount, response] = await to(applyDiscount(discountOptions))

  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: false })
  cartDispatch({ type: "SET_IS_ADDING_DISCOUNT_CODE", payload: false })

  var maybeApiError = maybeHandleApiError(errorDiscount, response)

  if (maybeApiError) {
    cartDispatch({
      type: "SET_NOTICE",
      payload: {
        type: "error",
        message: maybeApiError,
      },
    })
    return
  }

  const addedDiscount = hasDiscount(response.data)

  cartDispatch({
    type: "SET_DISCOUNT_CODE",
    payload: addedDiscount ? discount : false,
  })

  shopDispatch({
    type: "SET_CART_DATA",
    payload: response.data,
  })

  if (afterUpdatingDiscount) {
    afterUpdatingDiscount(response.data)
  }

  cartDispatch({
    type: "SET_NOTICE",
    payload: {
      type: "success",
      message: addedDiscount
        ? shopState.t.n.addedDiscount
        : shopState.t.n.removedDiscount,
    },
  })
}

async function updateCartNote(
  note,
  shopState,
  cartDispatch,
  inputElement = false,
  shopDispatch
) {
  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: true })

  const [noteError, response] = await to(
    updateNote({
      cartId: shopState.cartData.id,
      note: note,
      buyerIdentity: shopState.buyerIdentity,
    })
  )

  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: false })

  var maybeApiError = maybeHandleApiError(noteError, response)

  if (maybeApiError) {
    cartDispatch({
      type: "SET_NOTICE",
      payload: {
        type: "error",
        message: maybeApiError,
      },
    })
    return
  }

  wp.hooks.doAction("on.cartNoteChange", response.data)

  if (inputElement) {
    inputElement.current.focus()
  }

  shopDispatch({
    type: "SET_CART_DATA",
    payload: response.data,
  })

  cartDispatch({ type: "SET_CART_NOTE", payload: note })
}

async function updateIdentity(
  cartId,
  buyerIdentity,
  shopDispatch,
  cartDispatch
) {
  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: true })

  Cookies.remove("shopwp_buyer_identity")
  Cookies.set("shopwp_buyer_identity", buyerIdentity.language, {
    expires: 90,
  })

  const [error, response] = await to(
    updateBuyerIdentity({
      cartId: cartId,
      buyerIdentity: buyerIdentity,
    })
  )

  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: false })

  var maybeApiError = maybeHandleApiError(error, response)

  if (maybeApiError) {
    cartDispatch({
      type: "SET_NOTICE",
      payload: {
        type: "error",
        message: maybeApiError,
      },
    })
    return
  }

  shopDispatch({
    type: "SET_CART_DATA",
    payload: response.data,
  })

  var discount = hasDiscount(response.data)

  if (discount) {
    cartDispatch({
      type: "SET_DISCOUNT_CODE",
      payload: discount,
    })
  }
}

export {
  updateLines,
  removeLines,
  addLines,
  updateAttrs,
  getExistingCart,
  createNewCart,
  directCheckout,
  updateDiscount,
  hasDiscount,
  updateCartNote,
  updateIdentity,
}
