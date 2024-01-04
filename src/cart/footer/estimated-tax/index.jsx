import { Price } from "@shopwp/components"
import { useShopState } from "@shopwp/components"

function CartFooterEstimatedTax({ discountApplied }) {
  const shopState = useShopState()

  return (
    <div className="swp-tax-row" data-is-discount-applied={discountApplied}>
      <div className="swp-total-prefix">
        <p>{shopState.t.l.estTax}</p>
      </div>
      <div className="swp-total-amount">
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
