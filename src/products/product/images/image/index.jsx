import ProductGalleryContext from "../gallery/_state/context"
import { doFeaturedSizing, doThumbnailSizing } from "@shopwp/common"
import Img from "./img"
import { useProductState } from "../../_state/hooks"
import { useSettingsState } from "../../../../items/_state/settings/hooks"
import { hasLink } from "@shopwp/common"

const Link = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Link-public' */ "../../../../link")
)

function ProductImage({
  image,
  isFeatured,
  isVideo = false,
  showZoom = false,
}) {
  const { useEffect, useContext, useRef, useState } = wp.element
  const imageRef = useRef()
  const [galleryState, galleryDispatch] = useContext(ProductGalleryContext)
  const productState = useProductState()
  const settings = useSettingsState()
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

  return hasLink(settings) && isFeatured ? (
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
        showZoom={false}
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
      showZoom={showZoom}
    />
  )
}

export default ProductImage
