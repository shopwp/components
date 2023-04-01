/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { Price } from "Components"
import { useShopState } from "ShopState"

function SavingsInline({ amount, type }) {
  const shopState = useShopState()
  const SavingsInlineCSS = css`
    font-size: 15px;
    font-weight: normal;
    margin-right: 6px;
  `

  return type === "fixed" ? (
    <span css={SavingsInlineCSS}>
      (<Price price={amount} /> {shopState.t.l.off})
    </span>
  ) : (
    <span css={SavingsInlineCSS}>
      ({amount}% {shopState.t.l.off})
    </span>
  )
}

export default SavingsInline
