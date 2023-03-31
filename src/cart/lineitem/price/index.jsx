/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { mq } from "Common/css"
import Price from "Common/pricing"
import CartLineItemPriceSaleNotice from "../sale-notice"

function CartLineItemPriceSubscriptionDiscountNotice({
  subscriptionDiscount,
  price,
}) {
  const DiscountSubCSS = css`
    margin-top: 0;
    margin-bottom: 4px;
    font-size: 14px;
    font-style: italic;
  `

  const DiscountSubPriceCSS = css`
    margin-top: 0px;
    margin-bottom: 0px;
    margin-right: 7px;
    font-size: 14px;
    color: #313131;
    text-decoration: line-through;
    width: 65%;
    text-align: right;
  `

  return (
    <>
      <p css={DiscountSubCSS}>You're saving {subscriptionDiscount}% </p>
      <p css={DiscountSubPriceCSS}>
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
}) {
  const CartLineItemPriceCSS = css`
    flex: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-end;

    + .wps-cart-lineitem-left-in-stock {
      top: 45px;
    }

    ${mq("small")} {
      align-items: baseline;
      flex-direction: row;
      justify-content: flex-start;
      margin-top: 10px;

      + .wps-cart-lineitem-left-in-stock {
        top: 75px;
      }
    }
  `

  return (
    <div
      className="wps-cart-lineitem-price-total-wrapper"
      css={CartLineItemPriceCSS}
    >
      {subscriptionDiscount ? (
        <CartLineItemPriceSubscriptionDiscountNotice
          subscriptionDiscount={subscriptionDiscount}
          price={regPrice}
        />
      ) : null}

      {showingSaleNotice && !subscriptionDiscount && salePrice && (
        <CartLineItemPriceSaleNotice salePrice={salePrice} />
      )}

      <LineItemPriceSingle
        regPrice={lineItemTotal}
        showingSaleNotice={showingSaleNotice}
      />
    </div>
  )
}

function LineItemPriceSingle({ regPrice, showingSaleNotice }) {
  const lineItemPriceCSS = css`
    margin-top: 0;
    font-size: ${showingSaleNotice ? "16px" : "14px"};
    margin-top: ${showingSaleNotice ? "-2px" : "0"};
    color: #121212;
    font-weight: bold;
    width: auto;
    text-align: right;

    ${mq("small")} {
      text-align: left;
      font-size: 17px;
      margin-left: 0;
      left: 0;
    }
  `

  return (
    <div
      className="wps-cart-lineitem-price wps-cart-lineitem-price-total"
      css={lineItemPriceCSS}
    >
      <Price price={regPrice} />
    </div>
  )
}

export default wp.element.memo(CartLineItemPrice)
