import { Price, useShopState } from "@shopwp/components"

function ProductPricesSubscription({
  productState,
  subType,
  insideSubscriptionsWidget,
}) {
  return (
    <>
      {productState.selectedVariant &&
      productState.subscriptionPricing &&
      subType === "subscription" ? (
        <SellingGroupSubscriptionPricing
          productState={productState}
          insideSubscriptionsWidget={insideSubscriptionsWidget}
        />
      ) : null}

      {productState.selectedVariant && subType === "onetime" ? (
        <SellingGroupOnetimePricing
          productState={productState}
          insideSubscriptionsWidget={insideSubscriptionsWidget}
        />
      ) : null}
    </>
  )
}

function SellingGroupSubscriptionPricing({
  productState,
  insideSubscriptionsWidget,
}) {
  const shopState = useShopState()

  return (
    <>
      <p
        className={`swp-price swp-final-price${
          !insideSubscriptionsWidget ? " swp-price swp-product-price" : ""
        }`}
        data-is-compare-at="false"
      >
        <Price
          price={
            productState.subscriptionPricing.saved
              ? productState.subscriptionPricing.newPrice
              : productState.subscriptionPricing.oldPrice
          }
        />
      </p>

      {productState.subscriptionPricing.saved ? (
        <p
          className={`swp-price${
            !insideSubscriptionsWidget ? " swp-price swp-product-price" : ""
          }`}
          data-is-compare-at="true"
        >
          <Price price={productState.subscriptionPricing.oldPrice} />
        </p>
      ) : null}

      {productState.subscriptionPricing.savingsType === "percent" ? (
        <p className="swp-save-inline">
          ({shopState.t.l.save} {productState.subscriptionPricing.saved}
          %)
        </p>
      ) : productState.subscriptionPricing.savingsType === "fixed" ? (
        <p className="swp-save-inline">
          ({shopState.t.l.save}{" "}
          <Price price={productState.subscriptionPricing.saved} />)
        </p>
      ) : null}
    </>
  )
}

function SellingGroupOnetimePricing({
  productState,
  insideSubscriptionsWidget,
}) {
  return (
    <>
      <p className="swp-price swp-final-price">
        <Price price={productState.selectedVariant.price.amount} />
      </p>
      {productState.selectedVariant.compareAtPrice ? (
        <p className="swp-price" data-is-compare-at="true">
          <Price price={productState.selectedVariant.compareAtPrice.amount} />
        </p>
      ) : null}
    </>
  )
}

export default ProductPricesSubscription
