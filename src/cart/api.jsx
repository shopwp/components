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

function hasDiscount(cartData) {
  if (!cartData || !cartData.discountCodes) {
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
    updateLineItems(
      {
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
      },
      shopState
    )
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
    payload: response.cartLinesUpdate.cart,
  })
}

async function removeLines(lineItemIds, shopState, cartDispatch, shopDispatch) {
  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: true })

  const [error, response] = await to(
    removeLineItems(
      {
        lineIds: lineItemIds,
        cartId: shopState.cartData.id,
        buyerIdentity: shopState.buyerIdentity,
      },
      shopState
    )
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
    payload: response.cartLinesRemove.cart,
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

  const [addError, response] = await to(addLineItems(data, shopState))

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

  wp.hooks.doAction("on.afterAddToCart", data.lines, response.cartLinesAdd.cart)

  shopDispatch({
    type: "SET_CART_DATA",
    payload: response.cartLinesAdd.cart,
  })

  var existingCartId = localStorage.getItem("shopwp-cart-id")

  if (existingCartId !== response.cartLinesAdd.cart.id) {
    localStorage.setItem("shopwp-cart-id", response.cartLinesAdd.cart.id)
  }

  var savedDiscountFromUrl = localStorage.getItem("shopwp-cart-discount")

  if (savedDiscountFromUrl) {
    updateDiscount(cartDispatch, shopState, savedDiscountFromUrl, shopDispatch)
  }
}

async function updateAttrs(data, shopState, cartDispatch, shopDispatch) {
  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: true })

  const [addError, response] = await to(
    updateCartAttributes(
      {
        attributes: data,
        cartId: shopState.cartData.id,
        buyerIdentity: shopState.buyerIdentity,
      },
      shopState
    )
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
    payload: response.cartAttributesUpdate.cart,
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
    if (!cartData) {
      return
    }
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
      {
        id: cartId,
        buyerIdentity: shopState.buyerIdentity,
      },
      shopState
    )
  )

  wp.hooks.doAction("on.cartLoad", response.cart)

  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: false })

  var maybeApiErrorMessage = maybeHandleApiError(getCartError, response)

  if (maybeApiErrorMessage) {
    console.warn("ShopWP Error: ", maybeApiErrorMessage)
    localStorage.removeItem("shopwp-cart-discount")
    localStorage.removeItem("shopwp-cart-id")

    if (!response) {
      createNewCart(cartState, shopState, cartDispatch, shopDispatch)
    }

    return
  }

  if (!response.cart) {
    createNewCart(cartState, shopState, cartDispatch, shopDispatch)
    return
  }

  updateCartState(response.cart)
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
      ),
      shopState
    )
  )

  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: false })

  var maybeApiError = maybeHandleApiError(createCartError, response)

  if (maybeApiError) {
    shopDispatch({
      type: "SET_CART_DATA",
      payload: false,
    })

    wp.hooks.doAction("on.cartLoad", false)
  } else {
    shopDispatch({
      type: "SET_CART_DATA",
      payload: response.cartCreate.cart,
    })

    localStorage.setItem("shopwp-cart-id", response.cartCreate.cart.id)

    wp.hooks.doAction("on.cartLoad", response.cartCreate.cart)
  }

  shopDispatch({
    type: "SET_IS_CART_READY",
    payload: true,
  })
}

function directCheckout(data, shopState) {
  return new Promise(async (resolve, reject) => {
    var finalData = wp.hooks.applyFilters(
      "cart.directCheckoutSettings",
      {
        lines: data.lines,
        discountCodes: data?.discountCodes ? data.discountCodes : [],
        note: data?.note ? data.note : "",
        attributes: data?.attributes ? data.attributes : [],
        buyerIdentity: data?.buyerIdentity
          ? data?.buyerIdentity
          : shopState.buyerIdentity,
      },
      shopState,
      data
    )

    const [directCheckoutError, response] = await to(
      createCart(finalData, shopState.client)
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
      checkoutUrl: response.cartCreate.cart.checkoutUrl,
      trackingParams: shopState.trackingParams,
      target: linkTarget,
    })
  })
}

function onlyApplicableDiscounts(discountCodes) {
  if (!discountCodes || discountCodes.length === 0) {
    return []
  }

  return discountCodes.filter((code) => code.applicable)
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

  const [errorDiscount, response] = await to(
    applyDiscount(
      {
        cartId: shopState.cartData.id,
        existingDiscountCodes: shopState.cartData.discountCodes,
        buyerIdentity: shopState.buyerIdentity,
        discountToChange: discount,
        isRemoving: shouldRemove,
      },
      shopState.client
    )
  )

  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: false })
  cartDispatch({ type: "SET_IS_ADDING_DISCOUNT_CODE", payload: false })

  var applicableDiscountCodes = onlyApplicableDiscounts(
    response.cartDiscountCodesUpdate.cart.discountCodes
  )

  /*

  Only run these checks when adding a discount code

  */
  if (!shouldRemove) {
    // Is the added code found in list of applicable codes?
    var foundCode = applicableDiscountCodes.filter((code) => {
      return code.code === discount
    })

    // If the user entered an invalid code, or the list of applied codes is empty ...
    if (
      !applicableDiscountCodes ||
      applicableDiscountCodes.length === 0 ||
      !foundCode ||
      foundCode.length === 0
    ) {
      cartDispatch({
        type: "SET_NOTICE",
        payload: {
          type: "error",
          message:
            "The discount code entered is either inactive or not valid for some products in your cart. Please try a different code.",
        },
      })
      return
    }
  }

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
    payload: response.cartDiscountCodesUpdate.cart,
  })

  if (afterUpdatingDiscount) {
    afterUpdatingDiscount(response.cartDiscountCodesUpdate.cart)
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
    updateNote(
      {
        cartId: shopState.cartData.id,
        note: note,
        buyerIdentity: shopState.buyerIdentity,
      },
      shopState
    )
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

  wp.hooks.doAction("on.cartNoteChange", response.cartNoteUpdate.cart)

  if (inputElement) {
    inputElement.current.focus()
  }

  shopDispatch({
    type: "SET_CART_DATA",
    payload: response.cartNoteUpdate.cart,
  })

  cartDispatch({ type: "SET_CART_NOTE", payload: note })
}

async function updateIdentity(
  cartId,
  buyerIdentity,
  shopState,
  shopDispatch,
  cartDispatch
) {
  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: true })

  const [error, response] = await to(
    updateBuyerIdentity(
      {
        cartId: cartId,
        buyerIdentity: buyerIdentity,
      },
      shopState
    )
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
    payload: response.cartBuyerIdentityUpdate.cart,
  })
  var discount = hasDiscount(response.cartBuyerIdentityUpdate.cart)
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
