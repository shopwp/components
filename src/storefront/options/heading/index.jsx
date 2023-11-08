/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { usePortal } from "@shopwp/hooks"

function StorefrontFilterOptionsHeading({ settings }) {
  const headingCSS = css``
  return usePortal(
    <h2
      className="swp-storefront-heading wps-storefront-heading"
      css={headingCSS}
    >
      {settings.filterByLabelText}
    </h2>,
    settings.dropzoneHeading
  )
}

export default StorefrontFilterOptionsHeading
