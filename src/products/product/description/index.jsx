import { usePortal } from "@shopwp/hooks"
import { useProductState } from "../_state/hooks"
import { useSettingsState } from "../../../items/_state/settings/hooks"

function ProductDescription() {
  const settings = useSettingsState()
  const productState = useProductState()

  function maybeTruncateDescription() {
    if (!settings.descriptionLength) {
      return productState.payload.descriptionHtml
    } else {
      return (
        productState.payload.descriptionHtml.substring(
          0,
          settings.descriptionLength
        ) + " ..."
      )
    }
  }

  return usePortal(
    <div
      className={
        "swp-mb20 swp-product-description " + settings.descriptionClassName
      }
      aria-label="Product Description"
      itemProp="description"
      dangerouslySetInnerHTML={{ __html: maybeTruncateDescription() }}
    />,
    settings.dropzoneProductDescription
  )
}

export default wp.element.memo(ProductDescription)
