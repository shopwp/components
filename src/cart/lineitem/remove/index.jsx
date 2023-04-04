/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useShopState, useShopDispatch } from "@shopwp/components"
import { useCartState, useCartDispatch } from "@shopwp/components"
import { removeLines } from "../../api.jsx"

function CartLineItemRemove({ lineItem }) {
  const shopState = useShopState()
  const shopDispatch = useShopDispatch()
  const cartState = useCartState()
  const cartDispatch = useCartDispatch()

  function onRemove(e) {
    if (shopState.isCartUpdating) {
      return
    }

    removeLines(lineItem.id, shopState, cartDispatch, shopDispatch)

    wp.hooks.doAction("on.lineItemRemove", lineItem, lineItem.merchandise.id)
  }

  const removeStyles = css`
    position: absolute;
    top: -12px;
    right: 0;
    font-size: 12px;
    text-decoration: underline;
    padding-right: 0;
    text-align: right;
    padding: 13px 0;

    &:hover {
      cursor: ${shopState.isCartUpdating ? "not-allowed" : "pointer"};
      opacity: ${shopState.isCartUpdating ? "1" : "0.7"};
    }
  `

  return (
    <span
      className="wps-cart-lineitem-remove"
      css={removeStyles}
      onClick={onRemove}
    >
      {shopState.t.l.remove}
    </span>
  )
}

export default CartLineItemRemove
