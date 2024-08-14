import { useProductState } from "../../../_state/hooks"
import ProductPricesSubscription from "../../../pricing/subscription"
import { useSubscriptionsBuyButtonState } from "../_state/hooks"

function SellingGroupContent({ subType, text, isSelected, index }) {
  const productState = useProductState()
  const subscriptionsBuyButtonState = useSubscriptionsBuyButtonState()

  return (
    <div className="swp-selling-group-content" data-is-selected={isSelected}>
      <label tabIndex="0">
        <input
          type="radio"
          name={subscriptionsBuyButtonState.id + "subscriptions"}
          value={subType}
          defaultChecked={index === 0}
        />
        <div className="shopwp-radio-control"></div>
        <div className="swp-radio-text shopwp-radio-text">
          <p className="swp-radio-label">
            {wp.hooks.applyFilters(
              "product.subscriptionLabel",
              text,
              productState,
              isSelected
            )}
            {isSelected && productState.selectedVariant ? ":" : ""}
          </p>

          <ProductPricesSubscription
            productState={productState}
            subType={subType}
            insideSubscriptionsWidget={true}
          />
        </div>
      </label>
    </div>
  )
}

export default SellingGroupContent
