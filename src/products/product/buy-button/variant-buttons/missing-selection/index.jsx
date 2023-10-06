import { useShopState } from "@shopwp/components"

function ProductVariantMissingSelection({ option, productBuyButtonState }) {
  const shopState = useShopState()

  return (
    <span className="swp-missing-selections-text">
      {wp.hooks.applyFilters(
        "product.missingSelectionText",
        shopState.t.l.selectA + String(option.name).toLowerCase(),
        productBuyButtonState
      )}
    </span>
  )
}

export default ProductVariantMissingSelection
