/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useShopState } from "@shopwp/components"

function ProductPriceSaleNotice({ children }) {
  const shopState = useShopState()

  const ProductPriceSaleNoticeCSS = css`
    && {
      color: red;
      margin: 0;
      position: relative;
      top: 0;
      font-size: 15px;
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
