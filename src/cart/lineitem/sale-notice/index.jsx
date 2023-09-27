/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { Price } from "@shopwp/components"
import CartLineItemPriceSaleNoticeText from "./notice"

function CartLineItemPriceSaleNotice({ salePrice }) {
  const SalePriceCSS = css``

  return (
    <>
      <CartLineItemPriceSaleNoticeText />
      <div className="swp-cart-sale-price" css={SalePriceCSS}>
        <Price price={salePrice} />
      </div>
    </>
  )
}

export default CartLineItemPriceSaleNotice
