/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { Price } from "Components"
import { mq } from "Common"
import { useShopState } from "ShopState"

const CartFooterEstimatedTaxTooltip = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'CartFooterEstimatedTaxTooltip-public' */ "../../../tooltip"
  )
)

function CartFooterEstimatedTax({ discountApplied }) {
  const shopState = useShopState()

  const TaxAmountCSS = css`
    text-align: right;
    font-size: 16px;
    color: #121212;

    ${mq("small")} {
      font-size: 28px;
    }
  `

  const TaxRowCSS = css`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: 0 0 ${!discountApplied ? "10px" : "3px"} 0;
    border-bottom: ${!discountApplied ? "1px solid #ddd" : "none"};
    padding-bottom: ${!discountApplied ? "10px" : "6px"};
  `

  const TaxLabelCSS = css`
    font-size: 15px;
  `

  return (
    <div css={TaxRowCSS} className="wps-tax-row">
      <div className="wps-total-prefix" css={TaxLabelCSS}>
        <CartFooterEstimatedTaxTooltip
          label={shopState.t.l.estTax}
          options={{ placement: "top" }}
        >
          <p>{shopState.t.n.totalTax}</p>
        </CartFooterEstimatedTaxTooltip>
      </div>
      <div className="wps-total-amount" css={TaxAmountCSS}>
        <Price
          price={
            shopState.cartData.cost.totalTaxAmount
              ? shopState.cartData.cost.totalTaxAmount.amount
              : 0
          }
        />
      </div>
    </div>
  )
}

export default CartFooterEstimatedTax
