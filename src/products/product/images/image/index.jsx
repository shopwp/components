import ProductGalleryContext from "../gallery/_state/context"
import { doFeaturedSizing, doThumbnailSizing } from "@shopwp/common"
import Img from "./img"
import { useProductState } from "../../_state/hooks"
import { useSettingsState } from "../../../../items/_state/settings/hooks"
import {
  hasLink,
  getImageWidth,
  getImageHeight,
  addCustomSizingToImageUrl,
} from "@shopwp/common"

import { useZoomImageMove } from "@zoom-image/react"

const Loader = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Loader-public' */ "../../../../loader")
)

const Link = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Link-public' */ "../../../../link")
)

function ProductImage({ image, isFeatured, isVideo = false }) {
  const { useEffect, useContext, useRef, useState } = wp.element
  const imageRef = useRef()
  const [galleryState, galleryDispatch] = useContext(ProductGalleryContext)
  const productState = useProductState()
  const settings = useSettingsState()

  const zoomContainer = useRef()
  const zoom = useZoomImageMove()

  const [originalFeatImg] = useState(galleryState.featImage)

  const [shouldShowZoom, setShouldShowZoom] = useState(showZoom())

  const disableZoom = wp.hooks.applyFilters(
    "product.disableImageZoom",
    !isFeatured ? true : false
  )

  function showZoom() {
    if (!isFeatured) {
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

  function isShowingNextOnHover() {
    if (!isFeatured) {
      return
    }

    if (galleryState.featImageIsVideo) {
      return false
    }

    if (shouldShowZoom) {
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

  const [productImageSrc, setProductImageSrc] = useState(() => {
    return wp.hooks.applyFilters(
      "product.imageSrc",
      applyImageSizing(),
      image,
      isFeatured,
      isVideo,
      productState.payload
    )
  })

  useEffect(() => {
    if (
      !galleryState.featImage ||
      galleryState.featImageIsVideo ||
      settings.showZoom === false ||
      disableZoom
    ) {
      setShouldShowZoom(false)
      return
    }

    if (!isFeatured) {
      setShouldShowZoom(false)
      return
    }

    var newSrc = addCustomSizingToImageUrl({
      src: galleryState.featImage.originalSrc,
      width: getImageWidth(settings, false, 2),
      height: getImageHeight(settings, false, 2),
      crop: settings.imagesSizingCrop,
    })

    if (!newSrc) {
      newSrc = galleryState.featImagePlaceholder.src
    }

    if (zoomContainer.current && settings.linkTo !== "modal") {
      if (newSrc && newSrc.includes("public/imgs/placeholder")) {
        setShouldShowZoom(false)
        return
      }

      setShouldShowZoom(true)

      if (galleryState.featImageElement) {
        zoom.createZoomImage(zoomContainer.current, {
          zoomImageSource: newSrc,
          disableScrollLock: shopwp.misc.isMobile ? false : true,
          disabledContextMenu: shopwp.misc.isMobile ? true : false,
          zoomImageProps: {
            alt: galleryState.featImage.altText
              ? galleryState.featImage.altText
              : productState.payload.title,
          },
        })
      }
    }
  }, [
    zoomContainer,
    galleryState.featImage,
    settings.showZoom,
    productState.payload,
    galleryState.featImageIsVideo,
    settings.linkTo,
  ])

  function applyImageSizing() {
    if (isVideo) {
      if (isFeatured) {
        if (image.mediaContentType === "EXTERNAL_VIDEO") {
          return image.embeddedUrl
        } else {
          return image.sources[0].url
        }
      }
      return doThumbnailSizing(image.previewImage.url, settings)
    }

    if (isFeatured) {
      if (settings.imagesSizingToggle) {
        return doFeaturedSizing(image.originalSrc, settings)
      }

      return image.originalSrc
    } else {
      if (settings.thumbnailImagesSizingToggle) {
        return doThumbnailSizing(image.originalSrc, settings)
      }
      return image.originalSrc
    }
  }

  useEffect(() => {
    setProductImageSrc(applyImageSizing())

    if (isFeatured) {
      galleryDispatch({
        type: "SET_FEAT_IMAGE_ELEMENT",
        payload: imageRef.current,
      })
    }
  }, [image, settings])

  return (
    <div
      className={
        isFeatured
          ? "swp-product-image-feat-wrapper wps-product-image-wrapper"
          : "swp-product-image-thumb-wrapper"
      }
      data-align={settings.imagesAlign}
      data-show-zoom={shouldShowZoom}
      data-zoom-status={zoom.zoomImageState.zoomedImgStatus}
      ref={zoomContainer}
      onMouseEnter={isShowingNextOnHover() ? onMouseEnter : undefined}
      onMouseLeave={isShowingNextOnHover() ? onMouseLeave : undefined}
    >
      {zoom.zoomImageState.zoomedImgStatus === "loading" ? <Loader /> : null}
      {hasLink(settings) && isFeatured ? (
        <Link
          type="products"
          linkTo={settings.linkTo}
          target={settings.linkTarget}
          payload={productState.payload}
        >
          <Img
            payload={productState.payload}
            imageRef={imageRef}
            image={image}
            src={productImageSrc}
            galleryState={galleryState}
            isFeatured={isFeatured}
            linkTo={settings.linkTo}
            isVideo={isVideo}
            settings={settings}
          />
        </Link>
      ) : (
        <Img
          payload={productState.payload}
          imageRef={imageRef}
          image={image}
          src={productImageSrc}
          galleryState={galleryState}
          isFeatured={isFeatured}
          linkTo={settings.linkTo}
          isVideo={isVideo}
          settings={settings}
        />
      )}
    </div>
  )
}

export default ProductImage
