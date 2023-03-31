import { useSettingsState } from "../../../../items/_state/settings/hooks"
import { useProductState } from "../../_state/hooks"
import ProductBuyButtonTextNotice from "../notice"

function ProductBuyButtonLeftInStock() {
  const { useEffect, useState } = wp.element
  const [quantityLeft, setQuantityLeft] = useState(false)
  const settings = useSettingsState()
  const productState = useProductState()

  useEffect(() => {
    if (!productState.selectedVariant) {
      setQuantityLeft(false)
      return
    }

    if (productState.selectedVariant.node.availableForSale) {
      if (!productState.selectedVariant.node.quantityAvailable) {
        setQuantityLeft(false)
      }

      if (
        productState.selectedVariant.node.quantityAvailable <=
        settings.leftInStockThreshold
      ) {
        setQuantityLeft(productState.selectedVariant.node.quantityAvailable)
      }
    } else {
      setQuantityLeft(false)
    }
  }, [productState.selectedVariant])

  return quantityLeft && quantityLeft > 0 && productState.selectedVariant ? (
    <ProductBuyButtonTextNotice settings={settings} />
  ) : null
}

export default ProductBuyButtonLeftInStock
