import ProductGalleryWrapper from "./gallery/wrapper"
import { usePortal } from "@shopwp/hooks"
import { useProductState } from "../_state/hooks"
import { useSettingsState } from "../../../items/_state/settings/hooks"

function ProductImages() {
  const productState = useProductState()
  const settings = useSettingsState()

  return usePortal(
    <ProductGalleryWrapper
      settings={settings}
      element={productState.element}
    />,
    settings.dropzoneProductGallery
  )
}

export default ProductImages
