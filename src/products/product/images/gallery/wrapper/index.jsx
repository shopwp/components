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

  return (
    <>
      <FilterHook name="before.productImages" args={[productState.payload]} />
      <div
        className={
          settings.isSingleComponent
            ? "swp-mb20 "
            : "" +
              "swp-component wps-component swp-l-mw100 swp-component-products-images wps-component-products-images"
        }
        aria-label="Product Images"
        data-is-single-component={settings.isSingleComponent}
      >
        <ProductGalleryProvider payload={productState.payload}>
          <ProductGallery
            carousel={<ProductCarouselImages settings={settings} />}
          />
        </ProductGalleryProvider>
      </div>
      <FilterHook name="after.productImages" args={[productState.payload]} />
    </>
  )
}

export default ProductGalleryWrapper
