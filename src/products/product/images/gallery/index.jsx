import { useProductState } from "../../_state/hooks"
import ProductGalleryContext from "./_state/context"
import ProductThumbnailImages from "../thumbnails"
import ProductFeaturedImage from "../featured"
import { hasLink } from "@shopwp/common"
import { useSettingsState } from "../../../../items/_state/settings/hooks"

function ProductGallery({ carousel }) {
  const { useEffect, useContext } = wp.element
  const productState = useProductState()
  const [, galleryDispatch] = useContext(ProductGalleryContext)
  const settings = useSettingsState()

  function hasManyImages() {
    if (!productState) {
      return false
    }

    return productState.hasManyImages
  }

  function isFeaturedOnly() {
    if (hasLink(settings)) {
      if (settings.showFeaturedOnly) {
        return true
      } else {
        return false
      }
    }

    return settings.showFeaturedOnly
  }

  useEffect(() => {
    if (!productState.selectedVariant) {
      return
    }

    galleryDispatch({
      type: "SET_FEAT_IMAGE_IS_VIDEO",
      payload: false,
    })

    galleryDispatch({
      type: "SET_FEAT_IMAGE",
      payload: productState.selectedVariant.node.image,
    })
  }, [productState.selectedVariant])

  return (
    <>
      {isFeaturedOnly() ? (
        <ProductFeaturedImage />
      ) : settings.showAllImages ? (
        <div className="swp-all-images">
          {productState.payload.images.edges.map((img) => (
            <img
              className="swp-image"
              key={img.node.originalSrc}
              src={img.node.originalSrc}
              alt={img.node.altText}
            />
          ))}
        </div>
      ) : hasManyImages() ? (
        settings.showImagesCarousel ? (
          carousel
        ) : (
          <>
            <ProductFeaturedImage />
            <ProductThumbnailImages />
          </>
        )
      ) : (
        <ProductFeaturedImage />
      )}
    </>
  )
}

export default ProductGallery
