/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { usePortal } from "Hooks"
import { useProductState } from "../_state/hooks"
import ProductBuyButtonWrapper from "./wrapper"
import ProductBuyButtonProvider from "./_state/provider"
import { FilterHook } from "Common"
import { useSettingsState } from "../../../items/_state/settings/hooks"
import { useShopState } from "ShopState"

const Notice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notice-public' */ "../../../notice")
)

function ProductBuyButton() {
  const productState = useProductState()
  const settings = useSettingsState()
  const shopState = useShopState()

  const buyButtonWrapperCSS = css`
    display: flex;
    flex-direction: column;
    margin-bottom: ${settings.isSingleComponent ? "0px" : "15px"};
  `

  const unavailableNoticeCSS = css`
    margin-top: 15px;
  `

  return usePortal(
    <ProductBuyButtonProvider>
      <div
        css={buyButtonWrapperCSS}
        className="wps-component-products-buy-button"
        aria-label="Product Buy Button"
      >
        <FilterHook name="before.productBuyButton" args={[productState]} />

        {productState.payload.availableForSale ||
        settings.showOutOfStockVariants === true ? (
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
