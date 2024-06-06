import { getImageWidth, getImageHeight } from "@shopwp/common"
import ImageZoom from "react-image-zooom"

function Img(props) {
  function isSelectedImage() {
    if (props.isFeatured || !props.galleryState.featImage || !props.image) {
      return
    }

    if (
      props.galleryState.featImage?.mediaContentType &&
      props.image?.previewImage
    ) {
      if (props.galleryState.featImage?.sources && props.image?.sources) {
        return (
          props.galleryState.featImage.previewImage.id ===
          props.image.previewImage.id
        )
      } else {
        return (
          props.galleryState.featImage.embeddedUrl === props.image.embeddedUrl
        )
      }
    } else {
      return (
        props.galleryState.featImage.originalSrc === props.image.originalSrc
      )
    }
  }

  var altText = props.image
    ? props.image.altText
      ? props.image.altText
      : props.payload
      ? props.payload.title
      : "Product image"
    : props.payload.title + " featured image"

  var width = getImageWidth(props.settings, !props.isFeatured).toString()
  var height = getImageHeight(props.settings, !props.isFeatured).toString()

  return (
    <>
      {props.showZoom && props.src ? (
        <ImageZoom
          src={props.src}
          alt={altText}
          zoom="300"
          width={width}
          height={height}
        />
      ) : (
        <img
          ref={props.imageRef}
          itemProp="image"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          src={
            props.src ? props.src : props.galleryState.featImagePlaceholder.src
          }
          className={
            (isSelectedImage() ? "swp-feat-image" : "swp-thumb-image") +
            " swp-mw100 swp-product-image wps-product-image"
          }
          loading={props.settings.imagesLazyLoad ? "lazy" : "eager"}
          alt={altText}
          aria-label={props.payload ? props.payload.title : "Product image"}
          data-zoom={props.image ? props.image.originalSrc : false}
          width={width}
          height={height}
          data-is-featured={props.isFeatured}
          data-link-to={props.linkTo}
          data-is-video={props.isVideo}
        />
      )}

      {props.isVideo ? (
        <svg
          className="swp-video-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path d="M24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13V38.13zM48 432L336 256L48 80V432z" />
        </svg>
      ) : null}
    </>
  )
}

export default Img
