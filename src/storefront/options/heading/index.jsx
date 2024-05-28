import { usePortal } from "@shopwp/hooks"

function StorefrontFilterOptionsHeading({ settings }) {
  return usePortal(
    <h2 className="swp-storefront-heading wps-storefront-heading">
      {settings.filterByLabelText}
    </h2>,
    settings.dropzoneHeading
  )
}

export default StorefrontFilterOptionsHeading
