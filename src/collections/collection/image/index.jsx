/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { usePortal } from "@shopwp/hooks"
import { addCustomSizingToImageUrl } from "@shopwp/common"
import { useSettingsState } from "../../../items/_state/settings/hooks"
import { useCollectionState } from "../_state/hooks"
import Img from "../../../products/product/images/image/img"

const Link = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Link-public' */ "../../../link")
)

function CollectionImage() {
  const { useEffect, useRef, useState } = wp.element
  const collectionState = useCollectionState()
  const settings = useSettingsState()
  const imageRef = useRef()

  const [imageSrc, setImageSrc] = useState(() => {
    return collectionState.payload.image
      ? collectionState.payload.image.originalSrc
      : false
  })

  useEffect(() => {
    if (!imageSrc) {
      return
    }

    if (settings.collectionsImagesSizingToggle) {
      setImageSrc(
        addCustomSizingToImageUrl({
          src: collectionState.payload.image.originalSrc,
          width:
            settings.collectionsImagesSizingWidth === 0
              ? "auto"
              : settings.collectionsImagesSizingWidth,
          height:
            settings.collectionsImagesSizingHeight === 0
              ? "auto"
              : settings.collectionsImagesSizingHeight,
          crop: settings.collectionsImagesSizingCrop,
          scale: settings.collectionsImagesSizingScale,
        })
      )
    }
  }, [settings])

  const CollectionImageWrapperCSS = css`
    margin-bottom: 20px;
    max-width: 100%;
  `

  const CollectionImageCSS = css`
    max-width: 100%;
  `

  return usePortal(
    imageSrc ? (
      <div
        className="wps-component wps-component-collection-image"
        aria-label={collectionState.payload.title + " collection image"}
        css={CollectionImageWrapperCSS}
      >
        <Link
          type="collections"
          linkTo={settings.collectionsLinkTo}
          linkTitle={collectionState.payload.title}
          target={settings.collectionsLinkTarget}
          payload={collectionState.payload}
        >
          <Img
            imageRef={imageRef}
            image={collectionState.payload.image}
            src={imageSrc}
            isFeatured={true}
            linkTo={settings.collectionsLinkTo}
            settings={settings}
          />
        </Link>
      </div>
    ) : null,
    settings.collectionsDropzoneCollectionImage
  )
}

export default CollectionImage
