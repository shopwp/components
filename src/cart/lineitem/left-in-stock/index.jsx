/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useShopState } from "@shopwp/components"

function CartLineItemLeftInStock() {
  const shopState = useShopState()

  const CartLineItemLeftInStockCSS = css``

  return (
    <small
      className="swp-cart-lineitem-left-in-stock wps-cart-lineitem-left-in-stock"
      css={CartLineItemLeftInStockCSS}
    >
      {shopState.t.n.leftInStock}
    </small>
  )
}

export default CartLineItemLeftInStock
