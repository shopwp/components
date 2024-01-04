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

  return usePortal(
    imageSrc ? (
      <div
        className="swp-mb20 swp-mw100 wps-component swp-collection-image wps-component-collection-image"
        aria-label={collectionState.payload.title + " collection image"}
      >
        <Link
          type="collections"
          linkTo={settings.collectionsLinkTo}
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
