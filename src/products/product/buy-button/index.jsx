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

  const buyButtonWrapperCSS = css`
    display: flex;
    flex-direction: column;
    margin-bottom: ${settings.isSingleComponent ? "0px" : "15px"};
    margin-top: 0;
  `

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
        className="wps-component wps-component-products-buy-button"
        aria-label="Product Buy Button"
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
