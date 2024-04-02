import { Price } from "@shopwp/components"

function CartLineItemPriceSubscriptionDiscountNotice({
  subscriptionDiscount,
  price,
}) {
  return (
    <>
      <p className="swp-discount-label">
        You're saving {subscriptionDiscount}%{" "}
      </p>
      <p className="swp-discount-price">
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
  lineItem,
}) {
  return (
    <div className="swp-cart-lineitem-price-total-wrapper wps-cart-lineitem-price-total-wrapper">
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
        <LineItemPriceSingle regPrice={lineItem.cost.subtotalAmount.amount} />
      )}
    </div>
  )
}

function LineItemPriceSingle({ regPrice }) {
  return (
    <div className="swp-cart-lineitem-price wps-cart-lineitem-price wps-cart-lineitem-price-total">
      <Price price={regPrice} />
    </div>
  )
}

export default wp.element.memo(CartLineItemPrice)
