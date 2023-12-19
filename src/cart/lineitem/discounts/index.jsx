import { Price } from "@shopwp/components"

function CartLineItemDiscounts({ lineItem }) {
  return lineItem.discountAllocations.map((discount, index) => (
    <div
      className="swp-l-row swp-m-l-row swp-l-col-center swp-discount-wrapper"
      key={lineItem.id + discount.discountedAmount.amount}
    >
      <p className="swp-cart-discount-code">
        You save -<Price price={discount.discountedAmount.amount} />
      </p>
      <p className="swp-price-savings">
        <Price price={lineItem.cost.subtotalAmount.amount} />
      </p>
    </div>
  ))
}

export default CartLineItemDiscounts
