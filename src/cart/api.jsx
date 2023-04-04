import to from "await-to-js"
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

  if (maybeHandleApiError(updateError, response, cartDispatch)) {
    return
  }

  shopDispatch({
    type: "SET_CART_DATA",
    payload: response.data,
  })

  cartDispatch({
    type: "SET_IS_CART_EMPTY",
    payload: response.data.totalQuantity <= 0 ? true : false,
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

  if (maybeHandleApiError(error, response, cartDispatch)) {
    return
  }

  shopDispatch({
    type: "SET_CART_DATA",
    payload: response.data,
  })

  cartDispatch({
    type: "SET_IS_CART_EMPTY",
    payload: response.data.totalQuantity <= 0 ? true : false,
  })
}

async function addLines(data, cartDispatch, shopDispatch) {
  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: true })

  const [addError, response] = await to(addLineItems(data))

  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: false })

  if (maybeHandleApiError(addError, response, cartDispatch)) {
    return
  }

  wp.hooks.doAction("on.afterAddToCart", data.lines, response.data)

  shopDispatch({
    type: "SET_CART_DATA",
    payload: response.data,
  })

  cartDispatch({
    type: "SET_IS_CART_EMPTY",
    payload: response.data.totalQuantity <= 0 ? true : false,
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

  if (maybeHandleApiError(addError, response, cartDispatch)) {
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

  if (maybeHandleApiError(getCartError, response)) {
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

  cartDispatch({
    type: "SET_IS_CART_EMPTY",
    payload: response.data.totalQuantity <= 0 ? true : false,
  })

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

  if (maybeHandleApiError(createCartError, response, cartDispatch)) {
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

  if (maybeHandleApiError(directCheckoutError, response, cartDispatch)) {
    cartDispatch({ type: "SET_IS_CHECKING_OUT", payload: false })
    shopDispatch({ type: "TOGGLE_CART", payload: true })
    return
  }

  // All good, let's go
  checkoutRedirect(response.data.checkoutUrl, false, "_self")
}

async function addDiscount(cartDispatch, shopState, discount, shopDispatch) {
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
    discountCodes: [discount],
    buyerIdentity: shopState.buyerIdentity,
  }

  const [errorDiscount, response] = await to(applyDiscount(discountOptions))

  shopDispatch({ type: "SET_IS_CART_UPDATING", payload: false })
  cartDispatch({ type: "SET_IS_ADDING_DISCOUNT_CODE", payload: false })

  if (maybeHandleApiError(errorDiscount, response, cartDispatch)) {
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

  if (maybeHandleApiError(noteError, response, cartDispatch)) {
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

  if (maybeHandleApiError(error, response)) {
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

  cartDispatch({
    type: "SET_IS_CART_EMPTY",
    payload: response.data.totalQuantity <= 0 ? true : false,
  })
}

export {
  updateLines,
  removeLines,
  addLines,
  updateAttrs,
  getExistingCart,
  createNewCart,
  directCheckout,
  addDiscount,
  hasDiscount,
  updateCartNote,
  updateIdentity,
}
