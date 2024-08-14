import { useShopState } from "@shopwp/components"

function ProductBuyButtonTextNotice({ settings, quantityLeft, productState }) {
  const shopState = useShopState()

  if (settings.leftInStockText === "Only %s left!") {
    var leftInStockText = shopState.t.n.leftInStock
  } else {
    var leftInStockText = settings.leftInStockText
  }

  leftInStockText = wp.hooks.applyFilters(
    "product.leftInStockText",
    leftInStockText,
    quantityLeft,
    productState
  )

  return (
    <span className="swp-notice-text wps-notice-text">{leftInStockText}</span>
  )
}

export default ProductBuyButtonTextNotice
