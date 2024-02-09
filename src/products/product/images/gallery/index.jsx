import { useProductState } from "../../_state/hooks"
import ProductGalleryContext from "./_state/context"
import ProductThumbnailImages from "../thumbnails"
import ProductFeaturedImage from "../featured"
import { hasLink } from "@shopwp/common"
import { useSettingsState } from "../../../../items/_state/settings/hooks"

function ProductGallery({ carousel }) {
  const { useEffect, useContext } = wp.element
  const productState = useProductState()
  const [galleryState, galleryDispatch] = useContext(ProductGalleryContext)
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
      // need to reset image back to the first image

      if (productState.payload.media.edges.length) {
        galleryDispatch({
          type: "SET_FEAT_IMAGE",
          payload: productState.payload.media.edges[0].node.image,
        })
      } else {
        galleryDispatch({
          type: "SET_FEAT_IMAGE",
          payload: galleryState.featImagePlaceholder,
        })
      }

      return
    }

    galleryDispatch({
      type: "SET_FEAT_IMAGE_IS_VIDEO",
      payload: false,
    })

    if (productState.selectedVariant.node.image) {
      galleryDispatch({
        type: "SET_FEAT_IMAGE",
        payload: productState.selectedVariant.node.image,
      })
    }
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
