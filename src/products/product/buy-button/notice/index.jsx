/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useShopState } from "@shopwp/components"

function ProductBuyButtonTextNotice({ settings }) {
  const shopState = useShopState()
  const textNoticeCSS = css`
    text-align: center;
    margin: 5px auto 2.4em auto;
    font-size: 15px;
    padding: 10px;
    color: red;
    width: calc(100% - 30px);
    font-weight: normal;
    display: block;
    line-height: 1;
  `

  if (settings.leftInStockText === "Only %s left!") {
    var leftInStockText = shopState.t.n.leftInStock
  } else {
    var leftInStockText = settings.leftInStockText
  }

  return (
    <span className="wps-notice-text" css={[textNoticeCSS]}>
      {leftInStockText}
    </span>
  )
}

export default ProductBuyButtonTextNotice
