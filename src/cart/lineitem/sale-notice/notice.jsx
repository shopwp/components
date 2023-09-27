/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useShopState } from "@shopwp/components"

function CartLineItemPriceSaleNoticeText() {
  const shopState = useShopState()

  const CartLineItemPriceSaleNoticeTextStyles = css``

  return (
    <span
      className="swp-cart-lineitem-price-sale wps-cart-lineitem-price-sale"
      css={CartLineItemPriceSaleNoticeTextStyles}
    >
      {shopState.t.l.sale}
    </span>
  )
}

export default CartLineItemPriceSaleNoticeText
