import ProductThumbnailImage from "../thumbnail"
import { getMediaInfo } from "@shopwp/common"

function Thumbnails({ thumbnails, customOnClick }) {
  function getMediaId(image) {
    const media = getMediaInfo(image)
    return media.id
  }

  function getMediaData(image) {
    const media = getMediaInfo(image)
    return media.data
  }

  return thumbnails.edges.map((image, index) => (
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
}

export default Thumbnails
