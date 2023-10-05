/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useShopState } from "@shopwp/components"

function ProductPriceSaleNotice({ fontSize, color }) {
  const shopState = useShopState()

  const ProductPriceSaleNoticeCSS = css`
    && {
      color: ${color};
      margin: 0 10px 0 -8px;
      position: relative;
      top: 0;
      font-size: ${fontSize ? fontSize : "initial"};
      line-height: 1;
      font-style: normal;
    }
  `

  return (
    <>
      <small
        className="wps-pricing-sale-notice"
        css={ProductPriceSaleNoticeCSS}
      >
        {shopState.t.l.sale}
      </small>
    </>
  )
}

export default ProductPriceSaleNotice
