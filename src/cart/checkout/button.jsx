/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useCartState, useCartDispatch } from "@shopwp/components"
import { buttonCSS, mq } from "@shopwp/common"
import { checkoutRedirect } from "@shopwp/common"
import { useShopState } from "@shopwp/components"

const Loader = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Loader-public' */ "../../loader")
)

function CartCheckoutButton({ onCheckout }) {
  const cartState = useCartState()
  const cartDispatch = useCartDispatch()
  const shopState = useShopState()

  const checkoutButtonCSS = css`
    font-size: 22px;
    margin-top: 0.5em;
    margin-bottom: 0;
    background-color: ${cartState.isCheckingOut ||
    (shopwp.general.enableCartTerms && !cartState.termsAccepted) ||
    (!cartState.note && shopwp.general.noteRequired) ||
    !shopState.cartData ||
    !shopState.cartData.lines.edges.length
      ? "#cfcfcf"
      : shopwp.general.checkoutColor};
    padding: 16px 0 20px 0;
    transition: none;
    position: static;

    &:hover {
      background-color: ${cartState.isCheckingOut ||
      (shopwp.general.enableCartTerms && !cartState.termsAccepted) ||
      (!cartState.note && shopwp.general.noteRequired) ||
      !shopState.cartData ||
      !shopState.cartData.lines.edges.length
        ? "#cfcfcf"
        : shopwp.general.checkoutColor};
    }

    &:disabled {
      &:hover {
        cursor: not-allowed;
        color: #fff;
        background-color: #cfcfcf;
      }
    }

    ${mq("small")} {
      font-size: 22px;
    }
  `

  function onCheckout() {
    cartDispatch({ type: "SET_NOTICE", payload: false })
    cartDispatch({ type: "SET_IS_CHECKING_OUT", payload: true })

    wp.hooks.doAction("on.checkout", shopState)

    checkoutRedirect(
      shopState.cartData.checkoutUrl,
      function (checkoutUrl, target) {
        if (target && target === "_blank") {
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
      }
    )
  }

  return (
    <button
      className="wps-btn-checkout"
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
