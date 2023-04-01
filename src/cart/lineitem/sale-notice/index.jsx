/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { Price } from "Components"
import CartLineItemPriceSaleNoticeText from "./notice"

function CartLineItemPriceSaleNotice({ salePrice }) {
  const SalePriceCSS = css`
    display: inline-block;
    padding: 0;
    font-weight: normal;
    margin: 0;
    font-size: 14px;
    color: #313131;
    text-decoration: line-through;
    margin-right: 7px;
  `

  return (
    <>
      <CartLineItemPriceSaleNoticeText />
      <div css={SalePriceCSS}>
        <Price price={salePrice} />
      </div>
    </>
  )
}

export default CartLineItemPriceSaleNotice
