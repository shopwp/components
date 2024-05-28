import Carousel from "../../../../carousel"
import ProductFeaturedImageVideo from "../video"
import ProductThumbnailImages from "../thumbnails"
import ProductImage from "../image"

function ProductCarouselImages({ images, settings }) {
  const { useState } = wp.element
  const [customChange, setCustomChange] = useState(false)

  function customOnClick(index) {
    setCustomChange(index)
  }

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
      >
        {images.map((image) => (
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
