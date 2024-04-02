/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useShopDispatch, useShopState } from "@shopwp/components"

function CartClose() {
  const shopDispatch = useShopDispatch()
  const shopState = useShopState()

  function onClose(e) {
    shopDispatch({ type: "TOGGLE_CART", payload: false })
  }

  const CartCloseButtonCSS = css``

  return (
    <button
      css={CartCloseButtonCSS}
      className="swp-cart-close-button wps-btn-close wps-modal-close-trigger"
      title={shopState.t.l.closeCart}
      aria-label="Close"
      onClick={onClose}
      tabIndex="0"
    >
      <span className="wps-modal-close-trigger">×</span>
    </button>
  )
}

export default CartClose
