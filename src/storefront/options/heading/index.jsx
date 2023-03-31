/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { usePortal } from "Hooks"
import { useShopState } from "ShopState"

function StorefrontFilterOptionsHeading({ dropzone }) {
  const shopState = useShopState()

  const headingCSS = css`
    && {
      font-size: 18px;
      background-color: #eaeaea;
      margin: 0;
      padding: 10px 15px;
      border-radius: 5px;
    }
  `
  return usePortal(
    <h2 className="wps-storefront-heading" css={headingCSS}>
      {shopState.t.l.filterBy}
    </h2>,
    dropzone
  )
}

export default StorefrontFilterOptionsHeading
