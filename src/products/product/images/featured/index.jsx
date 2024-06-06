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
  const { useContext, useRef, useState, Suspense } = wp.element
  const [galleryState, galleryDispatch] = useContext(ProductGalleryContext)
  const [originalFeatImg] = useState(galleryState.featImage)
  const settings = useSettingsState()
  const productState = useProductState()

  const zoomContainer = useRef()

  const disableZoom = wp.hooks.applyFilters("product.disableImageZoom", false)

  function showZoom() {
    if (disableZoom) {
      return false
    }

    if (settings.showZoom === null) {
      return shopwp.general.productsImagesShowZoom
    }

    return settings.showZoom
  }

  function findNextImageIndex() {
    var foundIndex = 0

    if (!productState.payload.media) {
      return foundIndex
    }

    productState.payload.media.edges.forEach((image, index) => {
      if (image.node.mediaContentType === "IMAGE") {
        if (image.node.image.id === originalFeatImg.id) {
          foundIndex = index + 1
        }
      }
    })

    return foundIndex
  }

  function onMouseEnter() {
    var foundIndex = findNextImageIndex()

    if (foundIndex === 0) {
      return
    }

    var foundNextImage = productState.payload.media.edges[foundIndex].node

    if (foundNextImage) {
      galleryDispatch({
        type: "SET_FEAT_IMAGE",
        payload: foundNextImage.image,
      })
    }
  }

  function onMouseLeave() {
    galleryDispatch({
      type: "SET_FEAT_IMAGE",
      payload: originalFeatImg,
    })
  }

  const isOutOfStock = productState.payload.availableForSale === false

  function isShowingNextOnHover() {
    if (galleryState.featImageIsVideo) {
      return false
    }

    if (showZoom()) {
      return false
    }

    if (!productState.payload.media) {
      return false
    }

    if (productState.payload.media.edges.length <= 1) {
      return false
    }

    return settings.imagesShowNextOnHover
  }

  // useEffect(() => {
  //   if (
  //     !galleryState.featImage ||
  //     galleryState.featImageIsVideo ||
  //     settings.showZoom === false ||
  //     disableZoom
  //   ) {
  //     return
  //   }

  //   var newSrc = addCustomSizingToImageUrl({
  //     src: galleryState.featImage.originalSrc,
  //     width: getImageWidth(settings, false, 2),
  //     height: getImageHeight(settings, false, 2),
  //     crop: settings.imagesSizingCrop,
  //   })

  //   if (!newSrc) {
  //     newSrc = galleryState.featImagePlaceholder.src
  //   }

  //   if (zoomContainer.current && settings.linkTo !== "modal") {
  //     if (newSrc && newSrc.includes("public/imgs/placeholder")) {
  //       return
  //     }

  //     zoom.createZoomImage(zoomContainer.current, {
  //       zoomImageSource: newSrc,
  //       disableScrollLock: shopwp.misc.isMobile ? false : true,
  //       zoomImageProps: {
  //         alt: galleryState.featImage.altText
  //           ? galleryState.featImage.altText
  //           : productState.payload.title,
  //       },
  //     })
  //   }
  // }, [
  //   zoomContainer,
  //   galleryState.featImage,
  //   settings.showZoom,
  //   productState.payload,
  //   galleryState.featImageIsVideo,
  //   settings.linkTo,
  // ])

  return (
    <div
      className="swp-gallery-featured-wrapper wps-gallery-featured-wrapper"
      data-show-zoom={showZoom()}
      data-link-to={settings.linkTo}
      onMouseEnter={isShowingNextOnHover() ? onMouseEnter : undefined}
      onMouseLeave={isShowingNextOnHover() ? onMouseLeave : undefined}
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

            <div
              className={"swp-product-image-wrapper wps-product-image-wrapper"}
              data-align={settings.imagesAlign}
              ref={zoomContainer}
            >
              <ProductImage
                settings={settings}
                isFeatured={true}
                showZoom={showZoom()}
                image={galleryState.featImage}
              />
            </div>
          </>
        )}
      </Suspense>
    </div>
  )
}

export default ProductFeaturedImage
