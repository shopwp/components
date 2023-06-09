/** @jsx jsx */
import { jsx, css } from "@emotion/react"

function Img(props) {
  function isSelectedImage() {
    if (props.isFeatured || !props.galleryState.featImage) {
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

  const featThumbStyles = css`
    outline: 1px dashed #000000;
    outline-offset: 3px;
    transition: transform 100ms ease;
    max-width: 100%;
  `

  const thumbnailStyles = css`
    display: block;
    margin-bottom: ${props.isFeatured ? "0px" : "10px"};
    max-width: 100%;
    filter: ${props.isVideo ? "brightness(0.5)" : "none"};
    &:focus,
    &:active {
      outline: ${props.isFeatured ? "none" : "1px dashed #000000"};
      outline-offset: ${props.isFeatured ? "none" : "3px"};
    }

    &:hover {
      cursor: ${props.isFeatured
        ? "default" && props.linkTo !== "modal"
        : "pointer"};
    }
  `

  const videoIcon = css`
    position: absolute;
    width: 12px;
    fill: white;
    top: calc(50% - 14px);
    z-index: 9999;
    left: calc(50% - 6px);
  `

  return (
    <>
      <img
        css={isSelectedImage() ? featThumbStyles : thumbnailStyles}
        ref={props.imageRef}
        itemProp="image"
        src={props.src}
        className="wps-product-image"
        loading="lazy"
        alt={props.image.altText ? props.image.altText : ""}
        data-zoom={props.image.originalSrc}
      />
      {props.isVideo && (
        <svg
          css={videoIcon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path d="M24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13V38.13zM48 432L336 256L48 80V432z" />
        </svg>
      )}
    </>
  )
}

export default wp.element.memo(Img)
