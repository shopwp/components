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

function CartLineItemPrice({ regPrice, salePrice, subscriptionDiscount }) {
  return (
    <div className="swp-cart-lineitem-price-total-wrapper wps-cart-lineitem-price-total-wrapper">
      {subscriptionDiscount ? (
        <CartLineItemPriceSubscriptionDiscountNotice
          subscriptionDiscount={subscriptionDiscount}
          price={regPrice}
        />
      ) : null}

      {salePrice ? (
        <>
          <div className="swp-lineitem-was-price-wrap">
            <svg
              aria-hidden="true"
              focusable="false"
              className="swp-icon-discount"
              viewBox="0 0 12 12"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 0h3a2 2 0 012 2v3a1 1 0 01-.3.7l-6 6a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4l6-6A1 1 0 017 0zm2 2a1 1 0 102 0 1 1 0 00-2 0z"
                fill="currentColor"
              ></path>
            </svg>
            <span>
              <Price price={salePrice} />
            </span>
          </div>

          <LineItemPriceSingle regPrice={regPrice} />
        </>
      ) : (
        <LineItemPriceSingle regPrice={regPrice} />
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
