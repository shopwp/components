/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { usePortal } from "@shopwp/hooks"
import { useProductState } from "../_state/hooks"
import ProductBuyButtonWrapper from "./wrapper"
import ProductBuyButtonProvider from "./_state/provider"
import { FilterHook } from "@shopwp/common"
import { useSettingsState } from "../../../items/_state/settings/hooks"
import { useShopState } from "@shopwp/components"

const Notice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notice-public' */ "../../../notice")
)

function ProductBuyButton() {
  const { useEffect } = wp.element
  const productState = useProductState()
  const settings = useSettingsState()
  const shopState = useShopState()

  const buyButtonWrapperCSS = css``

  const unavailableNoticeCSS = css`
    margin-top: 15px;
  `

  useEffect(() => {
    wp.hooks.doAction("on.productBuyButtonRender", productState)
  }, [])

  return usePortal(
    <ProductBuyButtonProvider payload={productState.payload}>
      <div
        css={buyButtonWrapperCSS}
        className="swp-component wps-component wps-component-products-buy-button swp-l-col swp-0"
        aria-label="Product Buy Button"
        data-is-single-component={settings.isSingleComponent}
      >
        <FilterHook name="before.productBuyButton" args={[productState]} />

        {productState.payload.availableForSale ? (
          <ProductBuyButtonWrapper />
        ) : (
          <FilterHook name="product.unavailableHtml" args={[productState]}>
            <Notice status="warning" extraCSS={unavailableNoticeCSS}>
              {shopState.t.l.outOfStock}
            </Notice>
          </FilterHook>
        )}

        <FilterHook name="after.productBuyButton" args={[productState]} />
      </div>
    </ProductBuyButtonProvider>,
    settings.dropzoneProductBuyButton
  )
}

export default ProductBuyButton
