import { usePortal } from "@shopwp/hooks"
import { addCustomSizingToImageUrl } from "@shopwp/common"
import { useSettingsState } from "../../../items/_state/settings/hooks"
import Img from "../../../products/product/images/image/img"

const Link = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Link-public' */ "../../../link")
)

function CollectionImage({ payload }) {
  const { useEffect, useRef, useState } = wp.element
  const settings = useSettingsState()
  const imageRef = useRef()
  const [imageSrc, setImageSrc] = useState(
    payload.image
      ? payload.image.originalSrc
      : shopwp.misc.placeholderProductImage
  )

  useEffect(() => {
    if (!imageSrc) {
      return
    }

    if (!payload.image) {
      setImageSrc(shopwp.misc.placeholderProductImage)
      return
    }

    setImageSrc(
      addCustomSizingToImageUrl({
        src: payload.image.originalSrc,
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
  }, [settings, payload.image])

  return usePortal(
    imageSrc ? (
      <div
        className="swp-mb20 swp-mw100 wps-component swp-collection-image wps-component-collection-image"
        aria-label={payload.title + " collection image"}
      >
        <Link
          type="collections"
          linkTo={settings.collectionsLinkTo}
          manualLink={settings.collectionsLinkToUrl}
          target={settings.collectionsLinkTarget}
          payload={payload}
        >
          <Img
            payload={payload}
            imageRef={imageRef}
            image={payload.image}
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
