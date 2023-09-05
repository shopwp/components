/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import {
  useShopState,
  useShopDispatch,
  useCartState,
  useCartDispatch,
} from "@shopwp/components"
import { useAction, useFirstRender } from "@shopwp/hooks"
import {
  mq,
  SlideInFromRightCart,
  checkoutRedirect,
  getURLParam,
} from "@shopwp/common"

import {
  addLines,
  removeLines,
  updateAttrs,
  getExistingCart,
  createNewCart,
  directCheckout,
  addDiscount,
  updateCartNote,
  updateIdentity,
} from "../api.jsx"

import CartContainer from "../container"
import CartLoadingContents from "../contents/loading"

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
  const setCartNotes = useAction("do.setCartNote", null)
  const lineItemsAdded = useAction("do.addToCart")
  const discountCode = useAction("do.setCartDiscount", null)
  const doDirectCheckout = useAction("do.directCheckout", null)
  const doCartToggle = useAction("do.cartToggle", null)
  const doToggleCartTerms = useAction("do.toggleCartTerms", null)
  const doCheckout = useAction("do.checkout", null)
  const doUpdateBuyerIdentity = useAction("do.updateBuyerIdentity", null)

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
  }, [])

  /*
	
	After cart has loaded
	
	*/
  useEffect(() => {
    if (!shopState.cartData.id) {
      return
    }

    var discountCodeFromURL = getURLParam("discount")

    if (discountCodeFromURL) {
      addDiscount(cartDispatch, shopState, discountCodeFromURL, shopDispatch)
    }
  }, [shopState.cartData.id])

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

    checkoutRedirect(shopState.cartData.checkoutUrl)
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
    if (doDirectCheckout === null) {
      return
    }

    directCheckout(
      doDirectCheckout,
      cartState,
      cartDispatch,
      shopState,
      shopDispatch
    )
  }, [doDirectCheckout])

  useEffect(() => {
    if (discountCode === null) {
      return
    }

    addDiscount(cartDispatch, shopState, discountCode, shopDispatch)
  }, [discountCode])

  useEffect(() => {
    if (!updateCartAttributes) {
      return
    }

    updateAttrs(updateCartAttributes, shopState, cartDispatch, shopDispatch)
  }, [updateCartAttributes])

  useEffect(() => {
    if (!removeLineItems) {
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
    if (!lineItemsAdded) {
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

    addLines(dataToAdd, cartDispatch, shopDispatch)
  }, [lineItemsAdded])

  const cartCSS = css`
    height: 100%;
    display: flex;
    padding: 18px;
    flex-direction: column;
    justify-content: flex-start;
    transition: transform 320ms ease;
    box-sizing: border-box;

    ${mq("xsmall")} {
      width: 100%;
    }

    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `

  const cartContainerCSS = css`
    width: 400px;
    position: fixed;
    height: 100%;
    right: 0px;
    top: 0px;
    margin-top: 0px;
    background: white;
    box-shadow: rgb(0 0 0 / 10%) -17px 0px 35px;
    z-index: 99999999999999;

    ${mq("xsmall")} {
      width: 100%;
    }
  `

  return (
    <SlideInFromRightCart
      isOpen={shopState.isCartOpen}
      customStyles={cartContainerCSS}
      className={
        shopState.isCartOpen ? "shopwp-cart-is-open" : "shopwp-cart-is-closed"
      }
    >
      <div ref={cartElement} className="wps-cart shopwp-cart" css={cartCSS}>
        <CartLoadingContents isUpdating={shopState.isCartUpdating} />

        <CartContainer
          isCartOpen={shopState.isCartOpen}
          settings={cartState.settings}
        />
      </div>
    </SlideInFromRightCart>
  )
}

export default CartWrapper
