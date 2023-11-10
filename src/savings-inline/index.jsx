/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { Price } from "@shopwp/components"
import { useShopState } from "@shopwp/components"

function SavingsInline({ amount, type }) {
  const shopState = useShopState()
  const SavingsInlineCSS = css``

  return type === "fixed" ? (
    <span className="swp-price-savings" css={SavingsInlineCSS}>
      (<Price price={amount} /> {shopState.t.l.off})
    </span>
  ) : (
    <span className="swp-price-savings" css={SavingsInlineCSS}>
      ({amount}% {shopState.t.l.off})
    </span>
  )
}

export default SavingsInline
