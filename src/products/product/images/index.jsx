import ProductGalleryWrapper from "./gallery/wrapper"
import { usePortal } from "@shopwp/hooks"
import { useSettingsState } from "../../../items/_state/settings/hooks"

function ProductImages() {
  const settings = useSettingsState()

  return usePortal(<ProductGalleryWrapper />, settings.dropzoneProductGallery)
}

export default ProductImages
