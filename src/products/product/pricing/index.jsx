import { ProductPrices } from "./prices"
import { usePortal } from "Hooks"
import { useSettingsState } from "../../../items/_state/settings/hooks"

function ProductPricing() {
  const settings = useSettingsState()

  return usePortal(<ProductPrices />, settings.dropzoneProductPricing)
}

export default ProductPricing
