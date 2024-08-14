import { useShopState, useShopDispatch } from "@shopwp/components"
import { useCartDispatch } from "@shopwp/components"
import { removeLines } from "../../api.jsx"

function CartLineItemRemove({ lineItem }) {
  const shopState = useShopState()
  const shopDispatch = useShopDispatch()
  const cartDispatch = useCartDispatch()

  function onRemove(e) {
    if (shopState.isCartUpdating) {
      return
    }

    removeLines(lineItem.id, shopState, cartDispatch, shopDispatch)

    wp.hooks.doAction("on.lineItemRemove", lineItem, lineItem.merchandise.id)
  }

  return (
    <a
      className="swp-cart-lineitem-remove wps-cart-lineitem-remove"
      onClick={onRemove}
      tabIndex="0"
      href="#!"
    >
      {shopState.t.l.remove}
    </a>
  )
}

export default CartLineItemRemove
