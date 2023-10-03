/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useCartState, useCartDispatch } from "@shopwp/components"
import { buttonCSS } from "@shopwp/common"
import { checkoutRedirect } from "@shopwp/common"
import { useShopState } from "@shopwp/components"

const Loader = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Loader-public' */ "../../loader")
)

function CartCheckoutButton({ onCheckout }) {
  const cartState = useCartState()
  const cartDispatch = useCartDispatch()
  const shopState = useShopState()

  const checkoutButtonCSS = css``

  function onCheckout() {
    cartDispatch({ type: "SET_NOTICE", payload: false })
    cartDispatch({ type: "SET_IS_CHECKING_OUT", payload: true })

    wp.hooks.doAction("on.checkout", shopState)

    checkoutRedirect({
      checkoutUrl: shopState.cartData.checkoutUrl,
      trackingParams: shopState.trackingParams,
      callback: function (checkoutUrl, options) {
        if (options.target && options.target === "_blank") {
          cartDispatch({ type: "SET_IS_CHECKING_OUT", payload: false })
        } else {
          if (
            navigator.userAgent.indexOf("Safari") !== -1 &&
            navigator.userAgent.indexOf("Chrome") === -1
          ) {
            // Is Safari
            cartDispatch({ type: "SET_IS_CHECKING_OUT", payload: false })
          }
        }
      },
    })
  }

  return (
    <button
      className="swp-btn-checkout wps-btn-checkout"
      onClick={onCheckout}
      disabled={
        cartState.isCheckingOut ||
        (shopwp.general.enableCartTerms && !cartState.termsAccepted) ||
        (shopwp.general.noteRequired && !cartState.note) ||
        !shopState.cartData ||
        !shopState.cartData.lines.edges.length
      }
      css={[buttonCSS, checkoutButtonCSS]}
    >
      {cartState.isCheckingOut ? (
        <Loader isLoading={cartState.isCheckingOut} />
      ) : (
        shopState.t.l.beginCheckout
      )}
    </button>
  )
}

export default CartCheckoutButton
