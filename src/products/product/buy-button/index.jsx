/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { usePortal } from "@shopwp/hooks"
import { useProductState } from "../_state/hooks"
import { FilterHook } from "@shopwp/common"
import { useSettingsState } from "../../../items/_state/settings/hooks"
import { useShopState } from "@shopwp/components"
import ProductBuyButtonWrapper from "./wrapper"
import ProductBuyButtonProvider from "./_state/provider"

const Notice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notice-public' */ "../../../notice")
)

function ProductBuyButton() {
  const { useEffect } = wp.element
  const productState = useProductState()
  const settings = useSettingsState()
  const shopState = useShopState()

  const buyButtonWrapperCSS = css``

  useEffect(() => {
    wp.hooks.doAction("on.productBuyButtonRender", productState)
  }, [])

  return usePortal(
    <ProductBuyButtonProvider payload={productState.payload}>
      <div
        css={buyButtonWrapperCSS}
        className={
          "swp-l-col swp-0" + settings.isSingleComponent
            ? " swp-mb20 "
            : "" +
              " swp-component wps-component wps-component-products-buy-button"
        }
        aria-label="Product Buy Button"
        data-is-single-component={settings.isSingleComponent}
      >
        <FilterHook name="before.productBuyButton" args={[productState]} />

        {productState.payload.availableForSale ? (
          <ProductBuyButtonWrapper />
        ) : (
          <FilterHook name="product.unavailableHtml" args={[productState]}>
            <Notice status="warning">{shopState.t.l.outOfStock}</Notice>
          </FilterHook>
        )}

        <FilterHook name="after.productBuyButton" args={[productState]} />
      </div>
    </ProductBuyButtonProvider>,
    settings.dropzoneProductBuyButton
  )
}

export default ProductBuyButton
