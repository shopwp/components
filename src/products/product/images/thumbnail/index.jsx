/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import ProductImage from "../image"
import ProductGalleryContext from "../gallery/_state/context"
import { FilterHook } from "@shopwp/common"

function ProductThumbnailImage({
  image,
  isExternalVideo,
  isHostedVideo,
  index,
  customOnClick = false,
}) {
  const { useEffect, useContext, useState } = wp.element
  const [galleryState, galleryDispatch] = useContext(ProductGalleryContext)
  const [isActive, setIsActive] = useState(() => false)

  const ThumbnailCSS = css``

  useEffect(() => {
    if (!galleryState.featImage) {
      setIsActive(false)
      return
    }

    if (!checkIsActive(galleryState.featImage.originalSrc)) {
      setIsActive(false)
    } else {
      setIsActive(true)
    }

    return function cleanup() {
      setIsActive(false)
    }
  }, [galleryState.featImage])

  function checkIsActive(featImageSrc) {
    return featImageSrc === image.originalSrc
  }

  function onClick() {
    galleryDispatch({ type: "SET_FEAT_IMAGE", payload: image })
    galleryDispatch({
      type: "SET_FEAT_IMAGE_IS_VIDEO",
      payload: isExternalVideo || isHostedVideo,
    })

    if (customOnClick) {
      customOnClick(index)
    }
  }

  return (
    <div
      css={ThumbnailCSS}
      className="wps-component swp-product-thumbnail wps-component-products-images-thumbnail"
      role="button"
      aria-label="Product Images Thumbnail"
      onClick={onClick}
      data-wps-is-active={isActive}
    >
      <FilterHook name="before.productThumbnail" args={[galleryState]} />
      {isExternalVideo || isHostedVideo ? (
        <ProductImage isFeatured={false} image={image} isVideo={true} />
      ) : (
        <ProductImage isFeatured={false} image={image} />
      )}

      <FilterHook name="after.productThumbnail" args={[galleryState]} />
    </div>
  )
}

export default wp.element.memo(ProductThumbnailImage)
