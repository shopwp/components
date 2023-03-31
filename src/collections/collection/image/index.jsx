/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { usePortal } from "Hooks"
import { addCustomSizingToImageUrl } from "Common/images"
import { useSettingsState } from "../../../items/_state/settings/hooks"
import { useCollectionState } from "../_state/hooks"

const Link = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Link-public' */ "../../../link")
)

function CollectionImage() {
  const { useState, useEffect } = wp.element
  const collectionState = useCollectionState()
  const settings = useSettingsState()

  const [imageSrc, setImageSrc] = useState(() => {
    return collectionState.payload.image
      ? collectionState.payload.image.originalSrc
      : false
  })

  useEffect(() => {
    if (!imageSrc) {
      return
    }

    if (settings.imagesSizingToggle) {
      setImageSrc(
        addCustomSizingToImageUrl({
          src: collectionState.payload.image.originalSrc,
          width:
            settings.imagesSizingWidth === 0
              ? "auto"
              : settings.imagesSizingWidth,
          height:
            settings.imagesSizingHeight === 0
              ? "auto"
              : settings.imagesSizingHeight,
          crop: settings.imagesSizingCrop,
          scale: settings.imagesSizingScale,
        })
      )
    }
  }, [])

  const CollectionImageWrapperCSS = css`
    margin-bottom: 20px;
    max-width: 400px;
  `

  const CollectionImageCSS = css`
    max-width: 100%;
  `

  return usePortal(
    imageSrc ? (
      <div
        className="wps-component wps-component-collection-image"
        aria-label="Collection Image"
        css={CollectionImageWrapperCSS}
      >
        <Link
          type="collections"
          linkTo={settings.linkTo}
          target={settings.linkTarget}
          payload={collectionState.payload}
        >
          <img
            itemProp="image"
            src={imageSrc}
            className="wps-product-image"
            css={CollectionImageCSS}
            alt={
              collectionState.payload.image
                ? collectionState.payload.image.altText
                : ""
            }
            loading="lazy"
          />
        </Link>
      </div>
    ) : null,
    settings.dropzoneCollectionImage
  )
}

export default CollectionImage
