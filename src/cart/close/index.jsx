import { useShopDispatch, useShopState } from "@shopwp/components"

function CartClose() {
  const shopDispatch = useShopDispatch()
  const shopState = useShopState()

  function onClose(e) {
    shopDispatch({ type: "TOGGLE_CART", payload: false })
  }

  return (
    <button
      className="swp-cart-close-button wps-btn-close swp-modal-close-trigger-wrapper"
      title={shopState.t.l.closeCart}
      aria-label="Close"
      onClick={onClose}
      tabIndex="0"
    >
      <span className="swp-modal-close-trigger">×</span>
    </button>
  )
}

export default CartClose
