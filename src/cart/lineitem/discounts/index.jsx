import { findPercentageDiff } from "@shopwp/common"

function CartLineItemDiscounts({ lineItem }) {
  return (
    <div className="swp-l-row swp-m-l-row swp-l-col-center swp-discount-wrapper">
      <p className="swp-cart-discount-code">
        You save -{" "}
        {findPercentageDiff(
          lineItem.cost.totalAmount.amount,
          lineItem.cost.subtotalAmount.amount
        )}
        %
      </p>
    </div>
  )
}

export default CartLineItemDiscounts
