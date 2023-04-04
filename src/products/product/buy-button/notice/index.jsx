/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { SlideInFromTop } from "@shopwp/common"
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
  `

  if (settings.leftInStockText === "Only %s left!") {
    var leftInStockText = shopState.t.n.leftInStock
  } else {
    var leftInStockText = settings.leftInStockText
  }

  return (
    <SlideInFromTop>
      <span className="wps-notice-text" css={[textNoticeCSS]}>
        {leftInStockText}
      </span>
    </SlideInFromTop>
  )
}

export default ProductBuyButtonTextNotice
