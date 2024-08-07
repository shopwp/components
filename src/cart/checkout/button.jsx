/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useCartState, useCartDispatch } from "@shopwp/components"
import { createCheckoutUrl } from "@shopwp/common"
import { useShopState } from "@shopwp/components"

function CartCheckoutButton() {
  const { useState, useEffect } = wp.element
  const cartState = useCartState()
  const cartDispatch = useCartDispatch()
  const shopState = useShopState()

  const checkoutButtonCSS = css``
  const buttonCSS = css``

  const [checkoutLink, setCheckoutLink] = useState("")

  var shouldDisable =
    (shopwp.general.enableCartTerms && !cartState.termsAccepted) ||
    (shopwp.general.noteRequired && !cartState.note) ||
    !shopState.cartData ||
    !shopState.cartData.lines.edges.length

  shouldDisable = wp.hooks.applyFilters(
    "cart.checkoutButtonDisabled",
    shouldDisable,
    shopState.cartData,
    cartState
  )

  var cartButtonText = wp.hooks.applyFilters(
    "cart.checkoutButtonText",
    shopwp.general.cartCheckoutButtonText,
    shopState.cartData,
    cartState
  )

  function onCheckout() {
    if (shouldDisable) {
      return
    }

    cartDispatch({ type: "SET_NOTICE", payload: false })

    wp.hooks.doAction("on.checkout", shopState)

    if (shopwp.general.checkoutButtonTarget === "popout") {
      openCheckoutInPopout()
    }
  }

  function openCheckoutInPopout() {
    window.open(
      checkoutLink,
      "popup",
      "location=0,width=750,height=650,left=500,top=55"
    )
    return false
  }

  useEffect(() => {
    if (!shopState || !shopState.cartData) {
      return
    }

    var newCheckoutLink = createCheckoutUrl({
      checkoutUrl: shopState.cartData.checkoutUrl,
      trackingParams: shopState.trackingParams,
    })

    setCheckoutLink(newCheckoutLink)
  }, [shopState.cartData, shopState.trackingParams])

  return (
    <a
      href={
        shouldDisable || shopwp.general.checkoutButtonTarget === "popout"
          ? undefined
          : checkoutLink
      }
      className="swp-btn swp-btn-checkout wps-btn-checkout"
      onClick={onCheckout}
      css={[buttonCSS, checkoutButtonCSS]}
      target={
        shopwp.misc.isMobile ? "_self" : shopwp.general.checkoutButtonTarget
      }
      data-is-disabled={shouldDisable}
      tabIndex="0"
    >
      {cartButtonText}
    </a>
  )
}

export default CartCheckoutButton
