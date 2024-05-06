/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback from "../../error-fallback"
import {
  useShopState,
  useShopDispatch,
  useCartState,
  useCartDispatch,
} from "@shopwp/components"
import { useAction, useFirstRender } from "@shopwp/hooks"
import {
  checkoutRedirect,
  getURLParam,
  findTrackingParams,
} from "@shopwp/common"

import {
  addLines,
  removeLines,
  updateAttrs,
  getExistingCart,
  createNewCart,
  updateDiscount,
  updateCartNote,
  updateIdentity,
} from "../api.jsx"

import CartContainer from "../container"

const CartLoadingContents = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'CartLoadingContents-public' */ "../contents/loading"
  )
)

function CartWrapper() {
  const { useRef, useState, useEffect } = wp.element
  const cartElement = useRef()
  const isFirstRender = useFirstRender()
  const shopState = useShopState()
  const shopDispatch = useShopDispatch()
  const cartState = useCartState()
  const cartDispatch = useCartDispatch()

  const updateCartAttributes = useAction("do.updateCartAttributes")
  const removeLineItems = useAction("do.removeLineItems")
  const setCartNotes = useAction("do.setCartNote")
  const lineItemsAdded = useAction("do.addToCart")
  const discountCode = useAction("do.setCartDiscount")
  const doCartToggle = useAction("do.cartToggle")
  const doToggleCartTerms = useAction("do.toggleCartTerms")
  const doCheckout = useAction("do.checkout")
  const doUpdateBuyerIdentity = useAction("do.updateBuyerIdentity")

  const [cartId] = useState(() => localStorage.getItem("shopwp-cart-id"))

  function openCart() {
    shopDispatch({ type: "TOGGLE_CART", payload: true })
  }

  function closeCart() {
    shopDispatch({ type: "TOGGLE_CART", payload: false })
  }

  function addCustomLinkTriggers() {
    const elements = document.querySelectorAll(".shopwp-cart-trigger")
    if (elements.length) {
      elements.forEach((element) => {
        element.onclick = () =>
          shopDispatch({ type: "TOGGLE_CART", payload: true })
      })
    }
  }

  function maybeApplyDiscountFromURL() {
    const discountCodeFromURL = getURLParam("discount")

    if (discountCodeFromURL) {
      updateDiscount(cartDispatch, shopState, discountCodeFromURL, shopDispatch)
    }
  }

  function makeTabbable() {}

  /*
  
  When cart is ready
  
  */
  useEffect(() => {
    if (shopState.isCartReady) {
      maybeApplyDiscountFromURL()
    }
  }, [shopState.isCartReady])

  /*
	
	Main cart bootstrap hook
	
	*/
  useEffect(() => {
    addCustomLinkTriggers()

    if (cartId) {
      getExistingCart(cartId, cartState, shopState, cartDispatch, shopDispatch)
    } else {
      createNewCart(cartState, shopState, cartDispatch, shopDispatch)
    }

    var utmParams = findTrackingParams()

    if (utmParams.length) {
      shopDispatch({ type: "SET_TRACKING_PARAMS", payload: utmParams })
    }
  }, [])

  useEffect(() => {
    if (isFirstRender) {
      return
    }

    updateIdentity(cartId, shopState.buyerIdentity, shopDispatch, cartDispatch)
  }, [shopState.buyerIdentity])

  useEffect(() => {
    if (doUpdateBuyerIdentity === null) {
      return
    }

    shopDispatch({
      type: "UPDATE_BUYER_IDENTITY",
      payload: doUpdateBuyerIdentity,
    })
  }, [doUpdateBuyerIdentity])

  useEffect(() => {
    if (doCheckout === null) {
      return
    }

    checkoutRedirect({
      checkoutUrl: shopState.cartData.checkoutUrl,
      trackingParams: shopState.trackingParams,
    })
  }, [doCheckout])

  useEffect(() => {
    if (doCartToggle === null) {
      return
    }

    if (doCartToggle === "open") {
      openCart()
    } else if (doCartToggle === "close") {
      closeCart()
    }
  }, [doCartToggle])

  useEffect(() => {
    if (doToggleCartTerms === null) {
      return
    }

    cartDispatch({ type: "SET_TERMS_ACCEPTED", payload: doToggleCartTerms })
  }, [doToggleCartTerms])

  useEffect(() => {
    if (discountCode === null) {
      return
    }

    updateDiscount(cartDispatch, shopState, discountCode, shopDispatch)
  }, [discountCode])

  useEffect(() => {
    if (updateCartAttributes === null) {
      return
    }

    updateAttrs(updateCartAttributes, shopState, cartDispatch, shopDispatch)
  }, [updateCartAttributes])

  useEffect(() => {
    if (removeLineItems === null) {
      return
    }

    removeLines(removeLineItems, shopState, cartDispatch, shopDispatch)
  }, [removeLineItems])

  useEffect(() => {
    if (setCartNotes === null) {
      return
    }

    updateCartNote(setCartNotes, shopState, cartDispatch, false, shopDispatch)
  }, [setCartNotes])

  function addDefaults(lineItemsAdded) {
    return {
      lines: [],
      extras: {
        openCartAfterAdding: true,
      },
      ...lineItemsAdded,
    }
  }

  useEffect(() => {
    if (lineItemsAdded === null) {
      return
    }

    var lines = lineItemsAdded.lines

    var lineItems = addDefaults(lineItemsAdded)

    var dataToAdd = {
      cartId: shopState.cartData.id,
      buyerIdentity: shopState.buyerIdentity,
      lines: lines,
    }

    var totalAdding = lines.reduce(
      (prev, current) => current.quantity + prev,
      0
    )

    if (
      shopwp.cart.maxQuantity &&
      shopState.cartData.totalQuantity + totalAdding > shopwp.cart.maxQuantity
    ) {
      console.error(shopState.t.w.maxCartTotal)

      return
    }

    if (lineItems.extras.openCartAfterAdding) {
      openCart()
    }

    addLines(dataToAdd, cartDispatch, shopDispatch, cartState, shopState)
  }, [lineItemsAdded])

  const cartCSS = css``
  const cartContainerCSS = css``
  const cartInnerCSS = css``

  var isReadyToCheckout =
    (shopwp.general.enableCartTerms && !cartState.termsAccepted) ||
    (shopwp.general.noteRequired && !cartState.note) ||
    !shopState.cartData ||
    !shopState.cartData.lines.edges.length

  isReadyToCheckout = wp.hooks.applyFilters(
    "cart.checkoutButtonDisabled",
    isReadyToCheckout,
    shopState.cartData,
    cartState
  )

  return (
    <div
      css={cartContainerCSS}
      className={`swp-cart ${
        shopState.isCartOpen ? "swp-cart-is-open" : "swp-cart-is-closed"
      }${shopState.isCartUpdating ? " swp-cart-is-updating" : ""}${
        shopState.cartData &&
        shopState.cartData.lines &&
        shopState.cartData.lines.edges.length
          ? " swp-cart-is-not-empty"
          : " swp-cart-is-empty"
      }${
        isReadyToCheckout
          ? " swp-cart-is-not-ready-to-checkout"
          : " swp-cart-is-ready-to-checkout"
      }`}
    >
      <div className="swp-cart-inner" css={cartInnerCSS}>
        <div
          ref={cartElement}
          className="swp-cart-container wps-cart"
          css={cartCSS}
        >
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {shopState.isCartUpdating ? <CartLoadingContents /> : null}

            {shopState.cartData ? (
              <CartContainer settings={cartState.settings} />
            ) : null}
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}

export default CartWrapper
