import ProductGalleryContext from "../gallery/_state/context"
import ProductImage from "../image"
import { useSettingsState } from "../../../../items/_state/settings/hooks"
import { useProductState } from "../../_state/hooks"

const ProductImageSoldOutLabel = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'ProductImageSoldOutLabel-public' */ "../sold-out-label"
  )
)

const ProductImageOnSaleLabel = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'ProductImageOnSaleLabel-public' */ "../on-sale-label"
  )
)

const ProductFeaturedImageVideo = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductFeaturedImageVideo-public' */ "../video")
)

function ProductFeaturedImage() {
  const { useContext, Suspense } = wp.element
  const [galleryState] = useContext(ProductGalleryContext)
  const settings = useSettingsState()
  const productState = useProductState()

  const isOutOfStock = productState.payload.availableForSale === false

  return (
    <div
      className="swp-gallery-featured-wrapper wps-gallery-featured-wrapper"
      data-link-to={settings.linkTo}
    >
      <Suspense fallback={false}>
        {galleryState.featImageIsVideo ? (
          <ProductFeaturedImageVideo videoData={galleryState.featImage} />
        ) : (
          <>
            {productState.isOnSale &&
            settings.showSaleNotice &&
            !isOutOfStock ? (
              <ProductImageOnSaleLabel
                text={shopwp.t.l.sale}
                payload={productState.payload}
                showSaleNoticePercentage={settings.showSaleNoticePercentage}
              />
            ) : null}

            {isOutOfStock &&
            galleryState.featImage &&
            settings.showOutOfStockNotice ? (
              <ProductImageSoldOutLabel text={shopwp.t.l.soldOut} />
            ) : null}

            <ProductImage
              settings={settings}
              isFeatured={true}
              image={galleryState.featImage}
            />
          </>
        )}
      </Suspense>
    </div>
  )
}

export default ProductFeaturedImage
