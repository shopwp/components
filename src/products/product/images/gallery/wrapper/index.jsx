/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { ProductGallery } from "../index"
import { ProductGalleryProvider } from "../_state/provider.jsx"
import { FilterHook } from "Common"
import { useProductState } from "../../../_state/hooks"
import { useSettingsState } from "../../../../../items/_state/settings/hooks"

const ProductCarouselImages = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'ProductCarouselImages-public' */ "../../carousel"
  )
)

function ProductGalleryWrapper({ element }) {
  const productState = useProductState()
  const settings = useSettingsState()

  const ProductGalleryWrapperCSS = css`
    margin-bottom: ${settings.isSingleComponent ? "0px" : "15px"};
  `

  return (
    <>
      <FilterHook name="before.productImages" args={[productState.payload]} />
      <div
        className="wps-component wps-component-products-images"
        aria-label="Product Images"
        css={ProductGalleryWrapperCSS}
      >
        <ProductGalleryProvider payload={productState.payload}>
          <ProductGallery
            carousel={
              <ProductCarouselImages
                payload={productState.payload}
                settings={settings}
                images={
                  productState.payload.media
                    ? productState.payload.media.edges
                    : false
                }
                element={element}
              />
            }
          />
        </ProductGalleryProvider>
      </div>
      <FilterHook name="after.productImages" args={[productState.payload]} />
    </>
  )
}

export default ProductGalleryWrapper
