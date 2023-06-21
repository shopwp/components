/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { usePortal } from "@shopwp/hooks"

function StorefrontFilterOptionsHeading({ settings }) {
  const headingCSS = css`
    && {
      font-size: 17px;
      font-weight: bold;
      background-color: #f0f0f0;
      margin: 0;
      padding: 10px 15px;
      border-radius: ${shopwp.general.globalBorderRadius};
    }
  `
  return usePortal(
    <h2 className="wps-storefront-heading" css={headingCSS}>
      {settings.filterByLabelText}
    </h2>,
    settings.dropzoneHeading
  )
}

export default StorefrontFilterOptionsHeading
