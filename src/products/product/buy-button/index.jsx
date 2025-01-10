import { usePortal } from "@shopwp/hooks"
import { FilterHook } from "@shopwp/common"
import { useProductState } from "../_state/hooks"
import { useSettingsState } from "../../../items/_state/settings/hooks"
import ProductBuyButtonWrapper from "./wrapper"
import ProductBuyButtonProvider from "./_state/provider"

function ProductBuyButton() {
  const { useEffect } = wp.element
  const productState = useProductState()
  const settings = useSettingsState()

  useEffect(() => {
    wp.hooks.doAction("on.productBuyButtonRender", productState)
  }, [])

  return usePortal(
    <ProductBuyButtonProvider payload={productState.payload}>
      <div
        className="swp-mb20 swp-buy-button-wrapper"
        aria-label="Product Buy Button"
        data-is-single-component={settings.isSingleComponent}
        data-hide-variant-options={settings.hideVariantOptions}
      >
        <FilterHook name="before.productBuyButton" args={[productState]} />
        <ProductBuyButtonWrapper />
        <FilterHook name="after.productBuyButton" args={[productState]} />
      </div>
    </ProductBuyButtonProvider>,
    settings.dropzoneProductBuyButton
  )
}

export default ProductBuyButton
