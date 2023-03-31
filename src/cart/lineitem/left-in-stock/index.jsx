/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { mq } from "Common/css"
import { useShopState } from "ShopState"

function CartLineItemLeftInStock({ lineItem }) {
  const shopState = useShopState()

  const CartLineItemLeftInStockCSS = css`
    color: red;
    font-size: 13px;
    width: 100%;
    margin-top: 7px;

    ${mq("small")} {
      margin-top: 5px;
    }
  `

  return (
    <small
      className="wps-cart-lineitem-left-in-stock"
      css={CartLineItemLeftInStockCSS}
    >
      {shopState.t.n.leftInStock}
    </small>
  )
}

export default CartLineItemLeftInStock
