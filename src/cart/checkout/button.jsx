/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useCartState, useCartDispatch } from "@shopwp/components"
import { createCheckoutUrl } from "@shopwp/common"
import { useShopState } from "@shopwp/components"

const Loader = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Loader-public' */ "../../loader")
)

function CartCheckoutButton() {
  const { useState, useEffect } = wp.element
  const cartState = useCartState()
  const cartDispatch = useCartDispatch()
  const shopState = useShopState()

  const checkoutButtonCSS = css``
  const buttonCSS = css``

  const [checkoutLink, setCheckoutLink] = useState("")

  var shouldDisable =
    cartState.isCheckingOut ||
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

  function onCheckout() {
    if (shouldDisable) {
      return
    }

    cartDispatch({ type: "SET_NOTICE", payload: false })
    cartDispatch({ type: "SET_IS_CHECKING_OUT", payload: true })

    wp.hooks.doAction("on.checkout", shopState)
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
      href={shouldDisable ? undefined : checkoutLink}
      className="swp-btn swp-btn-checkout wps-btn-checkout"
      onClick={onCheckout}
      css={[buttonCSS, checkoutButtonCSS]}
      target={
        shopwp.misc.isMobile ? "_self" : shopwp.general.checkoutButtonTarget
      }
      data-is-disabled={shouldDisable}
    >
      {cartState.isCheckingOut ? (
        <Loader isLoading={cartState.isCheckingOut} />
      ) : (
        shopState.t.l.beginCheckout
      )}
    </a>
  )
}

export default CartCheckoutButton
