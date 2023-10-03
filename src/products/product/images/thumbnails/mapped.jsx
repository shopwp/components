import ProductThumbnailImage from "../thumbnail"
import { getMediaInfo } from "@shopwp/common"
import Carousel from "../../../../carousel"

function Thumbnails({ thumbnails, customOnClick, settings }) {
  function getMediaId(image) {
    const media = getMediaInfo(image)
    return media.id
  }

  function getMediaData(image) {
    const media = getMediaInfo(image)
    return media.data
  }

  return settings.showThumbsCarousel && thumbnails.edges.length > 5 ? (
    <Carousel
      settings={settings}
      customSettings={{
        slidesToScroll: 5,
        slidesToShow: 5,
        responsive: [
          {
            breakpoint: 1000,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
            },
          },
        ],
      }}
    >
      {thumbnails.edges.map((image, index) => (
        <ProductThumbnailImage
          key={getMediaId(image)}
          image={getMediaData(image)}
          isExternalVideo={
            image.node.mediaContentType === "EXTERNAL_VIDEO" ? true : false
          }
          isHostedVideo={image.node.mediaContentType === "VIDEO" ? true : false}
          customOnClick={customOnClick}
          index={index}
        />
      ))}
    </Carousel>
  ) : (
    thumbnails.edges.map((image, index) => (
      <ProductThumbnailImage
        key={getMediaId(image)}
        image={getMediaData(image)}
        isExternalVideo={
          image.node.mediaContentType === "EXTERNAL_VIDEO" ? true : false
        }
        isHostedVideo={image.node.mediaContentType === "VIDEO" ? true : false}
        customOnClick={customOnClick}
        index={index}
      />
    ))
  )
}

export default Thumbnails
