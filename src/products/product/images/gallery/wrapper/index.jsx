/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { ProductGalleryProvider } from "../_state/provider.jsx"
import { FilterHook } from "@shopwp/common"
import { useProductState } from "../../../_state/hooks"
import { useSettingsState } from "../../../../../items/_state/settings/hooks"
import ProductGallery from "../index"

const ProductCarouselImages = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'ProductCarouselImages-public' */ "../../carousel"
  )
)

function ProductGalleryWrapper() {
  const productState = useProductState()
  const settings = useSettingsState()

  const ProductGalleryWrapperCSS = css``

  return (
    <>
      <FilterHook name="before.productImages" args={[productState.payload]} />
      <div
        className={
          settings.isSingleComponent
            ? "swp-mb20 "
            : null + "swp-component wps-component wps-component-products-images"
        }
        aria-label="Product Images"
        css={ProductGalleryWrapperCSS}
        data-is-single-component={settings.isSingleComponent}
      >
        <ProductGalleryProvider payload={productState.payload}>
          <ProductGallery
            carousel={
              <ProductCarouselImages
                settings={settings}
                images={
                  productState.payload.media
                    ? productState.payload.media.edges
                    : false
                }
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
