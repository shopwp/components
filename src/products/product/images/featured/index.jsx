/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import ProductGalleryContext from "../gallery/_state/context"
import ProductImage from "../image"
import { useSettingsState } from "../../../../items/_state/settings/hooks"
import { useProductState } from "../../_state/hooks"
import { useShopState } from "@shopwp/components"
import {
  getImageWidth,
  getImageHeight,
  addCustomSizingToImageUrl,
  getImageWidthString,
} from "@shopwp/common"
import { useZoomImageMove } from "@zoom-image/react"

const Loader = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Loader-public' */ "../../../../loader")
)

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
  const { useEffect, useContext, useRef, useState, Suspense } = wp.element
  const paneElement = useRef()
  const [galleryState, galleryDispatch] = useContext(ProductGalleryContext)
  const [originalFeatImg] = useState(galleryState.featImage)
  const settings = useSettingsState()
  const productState = useProductState()
  const shopState = useShopState()
  const zoomContainer = useRef()
  const zoom = useZoomImageMove()

  function showZoom() {
    if (settings.linkTo !== "none") {
      return false
    }

    if (settings.showZoom === null) {
      return shopwp.general.productsImagesShowZoom
    }

    return settings.showZoom
  }

  function hasFeatImage() {
    return (
      galleryState.featImage &&
      galleryState.featImageElement &&
      paneElement.current
    )
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

  const paneElementCSS = css`
    position: relative;
    cursor: crosshair;
    overflow: hidden;
    max-width: ${getImageWidthString(settings)};
  `

  const ProductImageFeaturedWrapperCSS = css`
    display: flex;
    align-items: flex-start;
    justify-content: ${settings.imagesAlign === "left"
      ? "flex-start"
      : settings.imagesAlign === "right"
      ? "flex-end"
      : settings.imagesAlign};

    > a,
    > img,
    a img {
      display: block;
      flex: 1;
      width: 100%;
      max-width: 100%;
    }

    + div {
      background-size: cover !important;
    }
  `

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

  useEffect(() => {
    if (galleryState.featImageIsVideo) {
      return
    }

    var newSrc = addCustomSizingToImageUrl({
      src: galleryState.featImage.originalSrc,
      width: getImageWidth(settings, 2),
      height: getImageHeight(settings, 2),
      crop: settings.imagesSizingCrop,
    })

    if (zoomContainer.current) {
      zoom.createZoomImage(zoomContainer.current, {
        zoomImageSource: newSrc,
      })
    }
  }, [galleryState.featImageElement, galleryState.featImage, settings.showZoom])

  return (
    <div
      className="wps-gallery-featured-wrapper"
      ref={paneElement}
      css={paneElementCSS}
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
                text={shopState.t.l.sale}
                payload={productState.payload}
                showSaleNoticePercentage={settings.showSaleNoticePercentage}
              />
            ) : null}

            {isOutOfStock &&
            galleryState.featImage &&
            settings.showOutOfStockNotice ? (
              <ProductImageSoldOutLabel text={shopState.t.l.soldOut} />
            ) : null}

            <div
              className={
                "swp-product-image-wrapper wps-product-image-wrapper" +
                " swp-zoom-is-" +
                zoom.zoomImageState.zoomedImgStatus
              }
              css={ProductImageFeaturedWrapperCSS}
              ref={zoomContainer}
            >
              {zoom.zoomImageState.zoomedImgStatus === "loading" ? (
                <Loader />
              ) : null}
              {galleryState.featImage ? (
                <ProductImage
                  settings={settings}
                  isFeatured={true}
                  image={galleryState.featImage}
                />
              ) : (
                <ProductImage
                  settings={settings}
                  isFeatured={true}
                  image={galleryState.featImagePlaceholder}
                  placeholder={true}
                />
              )}
            </div>
          </>
        )}
      </Suspense>
    </div>
  )
}

export default ProductFeaturedImage
