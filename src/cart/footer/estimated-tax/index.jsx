/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { Price } from "@shopwp/components"
import { mq } from "@shopwp/common"
import { useShopState } from "@shopwp/components"

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
    display: flex;
  `

  return (
    <div css={TaxRowCSS} className="wps-tax-row">
      <div className="wps-total-prefix" css={TaxLabelCSS}>
        <p>{shopState.t.l.estTax}</p>
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
