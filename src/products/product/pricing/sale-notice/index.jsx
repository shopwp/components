/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useShopState } from "@shopwp/components"

function ProductPriceSaleNotice({ fontSize, color }) {
  const shopState = useShopState()

  const ProductPriceSaleNoticeCSS = css`
    && {
      color: ${color};
      font-size: ${fontSize ? fontSize : "initial"};
    }
  `

  return (
    <>
      <small
        className="swp-pricing-now-notice wps-pricing-sale-notice"
        css={ProductPriceSaleNoticeCSS}
      >
        {shopState.t.l.sale}
      </small>
    </>
  )
}

export default ProductPriceSaleNotice
