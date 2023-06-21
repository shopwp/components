/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useShopState } from "@shopwp/components"

function ProductPriceSaleNotice({ children, fontSize, color }) {
  const shopState = useShopState()

  const ProductPriceSaleNoticeCSS = css`
    && {
      color: ${color};
      margin: 0 10px 0 0;
      position: relative;
      top: 0;
      font-size: ${fontSize};
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
      {children}
    </>
  )
}

export default ProductPriceSaleNotice
