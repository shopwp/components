import { useShopState } from "@shopwp/components"

function ProductBuyButtonTextNotice({ settings }) {
  const shopState = useShopState()

  if (settings.leftInStockText === "Only %s left!") {
    var leftInStockText = shopState.t.n.leftInStock
  } else {
    var leftInStockText = settings.leftInStockText
  }

  return (
    <span className="swp-notice-text wps-notice-text">{leftInStockText}</span>
  )
}

export default ProductBuyButtonTextNotice
