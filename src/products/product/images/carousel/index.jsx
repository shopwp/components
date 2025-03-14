import Carousel from "../../../../carousel"
import ProductFeaturedImageVideo from "../video"
import ProductThumbnailImages from "../thumbnails"
import ProductImage from "../image"
import ProductGalleryContext from "../gallery/_state/context"
import { useProductState } from "../../_state/hooks"

function ProductCarouselImages({ settings }) {
  const { useState, useContext, useEffect } = wp.element
  const [customChange, setCustomChange] = useState(false)
  const [, galleryDispatch] = useContext(ProductGalleryContext)
  const productState = useProductState()

  function customOnClick(index) {
    setCustomChange(index)
  }

  function onSlideChange(newIndex) {
    var foundNextImage = productState.payload.media.edges[newIndex].node

    if (foundNextImage) {
      galleryDispatch({
        type: "SET_FEAT_IMAGE",
        payload: foundNextImage.image,
      })
    }
  }

  useEffect(() => {
    const foundIndex = productState.payload.media.edges.findIndex(
      (image) =>
        image.node.image.originalSrc ===
        productState.selectedVariant.image?.originalSrc
    )

    if (foundIndex > -1) {
      setCustomChange(foundIndex)
    }
  }, [productState.selectedVariant])

  return (
    <>
      <Carousel
        settings={settings}
        customSettings={{
          slidesToScroll: settings.carouselSlidesToScroll,
          slidesToShow: settings.carouselSlidesToShow,
          adaptiveHeight: true,
          dots: settings.imageCarouselThumbs ? false : settings.carouselDots,
        }}
        customChange={customChange}
        onSlideChange={onSlideChange}
      >
        {productState.payload.media.edges.map((image) => (
          <div
            key={
              image.node.mediaContentType === "IMAGE"
                ? image.node.image.id
                : image.node.previewImage.id
            }
          >
            {image.node.mediaContentType === "IMAGE" ? (
              <ProductImage image={image.node.image} isFeatured={true} />
            ) : (
              <ProductFeaturedImageVideo
                key={image.node.previewImage.id}
                videoData={image.node}
              />
            )}
          </div>
        ))}
      </Carousel>
      {settings.imageCarouselThumbs ? (
        <ProductThumbnailImages customOnClick={customOnClick} />
      ) : null}
    </>
  )
}

export default ProductCarouselImages
