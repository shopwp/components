/** @jsx jsx */
import { jsx, css, Global } from "@emotion/react"
import ProductGalleryContext from "../gallery/_state/context"
import ProductImage from "../image"
import { useSettingsState } from "../../../../items/_state/settings/hooks"
import { useProductState } from "../../_state/hooks"
import { useShopState } from "@shopwp/components"
import Drift from "drift-zoom"

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

  function showZoom() {
    if (settings.linkTo !== "none") {
      return false
    }

    if (settings.showZoom === null) {
      return shopwp.general.productsImagesShowZoom
    }

    return settings.showZoom
  }

  function driftOptions() {
    return {
      ...settings.imageZoomOptions,
      inlineContainer: paneElement.current,
      paneContainer: paneElement.current,
    }
  }

  function destroyDrift(drift) {
    drift.destroy()
    window.Drift = null
    drift = null
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

  function getImageWidth() {
    if (settings.imagesSizingToggle) {
      if (settings.imagesSizingWidth === 0) {
        return "100%"
      } else {
        return String(settings.imagesSizingWidth) + "px"
      }
    }

    return "100%"
  }

  const paneElementCSS = css`
    position: relative;
    cursor: crosshair;
    overflow: hidden;
    max-width: ${getImageWidth()};
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
    if (hasFeatImage() && showZoom()) {
      var drift = new Drift(galleryState.featImageElement, driftOptions())

      return () => {
        destroyDrift(drift)
      }
    }
  }, [galleryState.featImageElement, settings.showZoom])

  return (
    <div
      className="wps-gallery-featured-wrapper"
      ref={paneElement}
      css={paneElementCSS}
      onMouseEnter={isShowingNextOnHover() ? onMouseEnter : undefined}
      onMouseLeave={isShowingNextOnHover() ? onMouseLeave : undefined}
    >
      <Suspense fallback={false}>
        {showZoom() ? (
          <Global
            styles={css`
              @keyframes a {
                0% {
                  transform: scale(1.5);
                  opacity: 0;
                }
                to {
                  transform: scale(1);
                  opacity: 1;
                }
              }
              @keyframes b {
                0% {
                  transform: scale(1);
                  opacity: 1;
                }
                15% {
                  transform: scale(1.1);
                  opacity: 1;
                }
                to {
                  transform: scale(0.5);
                  opacity: 0;
                }
              }
              @keyframes c {
                0% {
                  transform: translate(-50%, -50%) rotate(0);
                }
                50% {
                  transform: translate(-50%, -50%) rotate(-180deg);
                }
                to {
                  transform: translate(-50%, -50%) rotate(-1turn);
                }
              }
              @keyframes d {
                0% {
                  transform: scale(1);
                }
                10% {
                  transform: scale(1.2) translateX(6px);
                }
                25% {
                  transform: scale(1.3) translateX(8px);
                }
                40% {
                  transform: scale(1.2) translateX(6px);
                }
                50% {
                  transform: scale(1);
                }
                60% {
                  transform: scale(0.8) translateX(6px);
                }
                75% {
                  transform: scale(0.7) translateX(8px);
                }
                90% {
                  transform: scale(0.8) translateX(6px);
                }
                to {
                  transform: scale(1);
                }
              }
              @keyframes e {
                0% {
                  transform: scale(1);
                }
                10% {
                  transform: scale(1.2) translateX(-6px);
                }
                25% {
                  transform: scale(1.3) translateX(-8px);
                }
                40% {
                  transform: scale(1.2) translateX(-6px);
                }
                50% {
                  transform: scale(1);
                }
                60% {
                  transform: scale(0.8) translateX(-6px);
                }
                75% {
                  transform: scale(0.7) translateX(-8px);
                }
                90% {
                  transform: scale(0.8) translateX(-6px);
                }
                to {
                  transform: scale(1);
                }
              }
              .drift-zoom-pane {
                background: rgba(0, 0, 0, 0.8);
                transform: translateZ(0);
                // border-radius: 50%;
                width: 100%;
                height: 100%;
                z-index: 999;
                left: 0 !important;
                top: 0 !important;
                img {
                  max-width: none !important;
                  width: auto !important;
                }
              }
              .drift-zoom-pane.drift-opening {
                animation: a 0.18s ease-out;
              }
              .drift-zoom-pane.drift-closing {
                animation: b 0.14s ease-in;
              }
              .drift-zoom-pane.drift-inline {
                position: absolute;
                box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
                z-index: 999;
              }
              .drift-loading .drift-zoom-pane-loader {
                display: block;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 66px;
                height: 20px;
                animation: c 1.8s linear infinite;
              }
              .drift-zoom-pane-loader:after,
              .drift-zoom-pane-loader:before {
                content: "";
                display: block;
                width: 20px;
                height: 20px;
                position: absolute;
                top: 50%;
                margin-top: -10px;
                border-radius: 20px;
                background: hsla(0, 0%, 100%, 0.9);
              }
              .drift-zoom-pane-loader:before {
                left: 0;
                animation: d 1.8s linear infinite;
              }
              .drift-zoom-pane-loader:after {
                right: 0;
                animation: e 1.8s linear infinite;
                animation-delay: -0.9s;
              }
            `}
          />
        ) : null}

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
              className="wps-product-image-wrapper"
              css={ProductImageFeaturedWrapperCSS}
            >
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
