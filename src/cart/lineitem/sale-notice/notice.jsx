/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { mq } from "@shopwp/common"
import { useShopState } from "@shopwp/components"

function CartLineItemPriceSaleNoticeText() {
  const shopState = useShopState()

  const CartLineItemPriceSaleNoticeTextStyles = css`
    color: red;
    margin-left: 15px;
    margin-top: 0px;
    font-size: 15px;
    width: 100%;
    text-align: right;
    margin-bottom: -6px;
    margin-top: -6px;

    ${mq("small")} {
      text-align: left;
      margin-top: 0px;
      margin-left: 0;
    }
  `

  return (
    <span
      className="wps-cart-lineitem-price-sale"
      css={CartLineItemPriceSaleNoticeTextStyles}
    >
      {shopState.t.l.sale}
    </span>
  )
}

export default CartLineItemPriceSaleNoticeText
