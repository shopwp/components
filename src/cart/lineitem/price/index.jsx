/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { Price } from "@shopwp/components"

function CartLineItemPriceSubscriptionDiscountNotice({
  subscriptionDiscount,
  price,
}) {
  const DiscountSubCSS = css``
  const DiscountSubPriceCSS = css``

  return (
    <>
      <p className="swp-discount-label" css={DiscountSubCSS}>
        You're saving {subscriptionDiscount}%{" "}
      </p>
      <p className="swp-discount-price" css={DiscountSubPriceCSS}>
        <Price price={price} />
      </p>
    </>
  )
}

function CartLineItemPrice({
  showingSaleNotice,
  lineItemTotal,
  regPrice,
  salePrice,
  subscriptionDiscount,
  shopState,
}) {
  const CartLineItemPriceCSS = css``

  return (
    <div
      className="swp-cart-lineitem-price-total-wrapper wps-cart-lineitem-price-total-wrapper"
      css={CartLineItemPriceCSS}
    >
      {subscriptionDiscount ? (
        <CartLineItemPriceSubscriptionDiscountNotice
          subscriptionDiscount={subscriptionDiscount}
          price={regPrice}
        />
      ) : null}

      {showingSaleNotice && !subscriptionDiscount && salePrice ? (
        <>
          <span className="swp-cart-lineitem-price-sale wps-cart-lineitem-price-sale">
            {shopState.t.l.sale}
          </span>

          <LineItemPriceSingle regPrice={lineItemTotal} />

          <div className="swp-cart-sale-price">
            <Price price={salePrice} />
          </div>
        </>
      ) : (
        <LineItemPriceSingle regPrice={lineItemTotal} />
      )}
    </div>
  )
}

function LineItemPriceSingle({ regPrice }) {
  const lineItemPriceCSS = css``

  return (
    <div
      className="swp-cart-lineitem-price wps-cart-lineitem-price wps-cart-lineitem-price-total"
      css={lineItemPriceCSS}
    >
      <Price price={regPrice} />
    </div>
  )
}

export default wp.element.memo(CartLineItemPrice)
