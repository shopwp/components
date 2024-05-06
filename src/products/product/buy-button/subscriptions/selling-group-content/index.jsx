import { Radio } from "react-radio-group"
import { useProductState } from "../../../_state/hooks"
import ProductPricesSubscription from "../../../pricing/subscription"

function SellingGroupContent({ subType, text, isSelected }) {
  const productState = useProductState()

  return (
    <div className="swp-selling-group-content" data-is-selected={isSelected}>
      <label tabIndex="0">
        <Radio value={subType} />
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
