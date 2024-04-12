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
  cartState,
  cartDispatch,
  shopDispatch,
  lineItem,
  newQuantity
) {
  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: true })

  const [updateError, response] = await to(
    updateLineItems({
      cartId: shopState.cartData.id,
      lines: [
        {
          merchandiseId: lineItem.merchandise.id,
          id: lineItem.id,
          quantity: newQuantity,
          attributes: lineItem.attributes ? lineItem.attributes : [],
        },
      ],
      buyerIdentity: shopState.buyerIdentity,
    })
  )

  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: false })

  var maybeApiError = maybeHandleApiError(updateError, response)

  if (maybeApiError) {
    cartDispatch({
      type: "SET_INVENTORY_ERRORS",
      payload: {
        lineItem: lineItem,
        error: maybeApiError,
      },
    })

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

async function addLines(
  data,
  cartDispatch,
  shopDispatch,
  cartState,
  shopState
) {
  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: true })

  const [addError, response] = await to(addLineItems(data))

  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: false })

  var maybeApiError = maybeHandleApiError(addError, response)

  if (maybeApiError) {
    var existingCartId = localStorage.getItem("shopwp-cart-id")

    // Until we move to the admin API, we need to call this again to fetch the correct cart contents
    getExistingCart(
      existingCartId,
      cartState,
      shopState,
      cartDispatch,
      shopDispatch
    )

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

  var existingCartId = localStorage.getItem("shopwp-cart-id")

  if (existingCartId !== response.data.id) {
    localStorage.setItem("shopwp-cart-id", response.data.id)
  }
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
  function updateCartState(cartData) {
    shopDispatch({
      type: "SET_CART_DATA",
      payload: cartData,
    })

    var discount = hasDiscount(cartData)

    if (discount) {
      cartDispatch({
        type: "SET_DISCOUNT_CODE",
        payload: discount,
      })
    }

    shopDispatch({
      type: "SET_IS_CART_READY",
      payload: true,
    })
    cartDispatch({ type: "SET_CART_NOTE", payload: cartData.note })
  }

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

  var maybeApiErrorMessage = maybeHandleApiError(getCartError, response)

  if (maybeApiErrorMessage) {
    console.warn("ShopWP Error: ", maybeApiErrorMessage)
    localStorage.removeItem("shopwp-cart-id")

    if (!response || response.success === false) {
      createNewCart(cartState, shopState, cartDispatch, shopDispatch)
    }

    return
  }

  updateCartState(response.data)
}

async function createNewCart(cartState, shopState, cartDispatch, shopDispatch) {
  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: true })

  var attrs = []

  if (shopwp.general.addAttrsToOrder) {
    attrs = [
      {
        key: "ShopWP Site",
        value: shopwp.misc.siteUrl,
      },
    ]
  }

  const [createCartError, response] = await to(
    createCart(
      wp.hooks.applyFilters(
        "cart.createSettings",
        {
          note: "",
          buyerIdentity: shopState.buyerIdentity,
          attributes: attrs,
        },
        cartState,
        shopState
      )
    )
  )

  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: false })

  var maybeApiError = maybeHandleApiError(createCartError, response)

  if (maybeApiError) {
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

  shopDispatch({
    type: "SET_IS_CART_READY",
    payload: true,
  })
}

function directCheckout(data, shopState) {
  return new Promise(async (resolve, reject) => {
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
          shopState,
          data
        )
      )
    )

    var maybeApiError = maybeHandleApiError(directCheckoutError, response)

    if (maybeApiError) {
      reject(maybeApiError)
      return
    }

    if (data.settings && data.settings.linkTarget) {
      var linkTarget = data.settings.linkTarget
    } else {
      var linkTarget = false
    }

    resolve({
      checkoutUrl: response.data.checkoutUrl,
      trackingParams: shopState.trackingParams,
      target: linkTarget,
    })
  })
}

// function combineDiscounts(shopState, discountToAdd) {
//   var newDiscountCodesToAdd = [discountToAdd]

//   if (shopState.cartData.discountCodes.length) {
//     var currentlyAppliedCodes = shopState.cartData.discountCodes.map(
//       (ds) => ds.code
//     )
//   } else {
//     var currentlyAppliedCodes = []
//   }

//   return currentlyAppliedCodes.concat(newDiscountCodesToAdd)
// }
// function subtractDiscounts(shopState, discountToRemove) {
//   var newlist = shopState.cartData.discountCodes.filter(
//     (d) => d.code !== discountToRemove
//   )
//   return newlist.map((ds) => ds.code)
// }

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

  var discountOptions = {
    cartId: shopState.cartData.id,
    existingDiscountCodes: shopState.cartData.discountCodes,
    buyerIdentity: shopState.buyerIdentity,
    discountToChange: discount,
    isRemoving: shouldRemove,
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
      message: shouldRemove
        ? shopState.t.n.removedDiscount
        : shopState.t.n.addedDiscount,
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
