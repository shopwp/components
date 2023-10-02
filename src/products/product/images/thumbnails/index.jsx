/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import Thumbnails from "./mapped"
import { doFeaturedSizing } from "@shopwp/common"
import { mq } from "@shopwp/common"
import isEmpty from "lodash-es/isEmpty"
import { to } from "@shopwp/common"
import { useProductState } from "../../_state/hooks"
import { useSettingsState } from "../../../../items/_state/settings/hooks"

function ProductThumbnailImages({ customOnClick }) {
  const { useState } = wp.element
  const [preloadStatus, setPreloadStatus] = useState("idle")
  const settings = useSettingsState()
  const productState = useProductState()

  const [thumbnails] = useState(
    wp.hooks.applyFilters("product.thumbnails", productState.payload.media)
  )

  const thumbnailsWrapperCSS = css`
    display: ${settings.showThumbsCarousel ? "flex" : "grid"};
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 15px;
    grid-row-gap: 0px;
    margin-top: 8px;
    max-width: 410px;

    ${mq("small")} {
      display: flex;
      flex-wrap: wrap;
      gap: 0px 12px;
      max-width: 100%;

      > div {
        width: 57px;
      }
    }
  `

  function hasImages() {
    return productState.payload && !isEmpty(productState.payload.media)
  }

  function preload(imageObj) {
    return new Promise((resolve, reject) => {
      const img = new Image()

      if (imageObj.node && imageObj.node.mediaContentType === "IMAGE") {
        img.onload = resolve
        img.onerror = reject
        img.src = doFeaturedSizing(imageObj.node.image.originalSrc, settings)
      }
    })
  }

  function preloadAll(images) {
    return Promise.all(images.edges.map(preload))
  }

  async function preloadImages() {
    await to(preloadAll(productState.payload.media))

    setPreloadStatus("done")
  }

  function onMouseEnter() {
    if (preloadStatus === "done") {
      return
    }

    preloadImages()
  }

  return hasImages() ? (
    <div
      className="wps-thumbnails-wrapper"
      aria-label="Product Thumbnails"
      css={thumbnailsWrapperCSS}
      onMouseEnter={preloadStatus === "idle" ? onMouseEnter : undefined}
    >
      <Thumbnails
        thumbnails={thumbnails}
        customOnClick={customOnClick}
        settings={settings}
      />
    </div>
  ) : null
}

export default wp.element.memo(ProductThumbnailImages)
