import { Price } from "@shopwp/components"

function CartLineItemDiscounts({ lineItem }) {
  return lineItem.discountAllocations.map((discount, index) => (
    <div
      className="swp-l-row swp-l-col-center"
      key={lineItem.id + discount.discountedAmount.amount}
    >
      <p className="swp-cart-discount-code">
        <Price price={discount.discountedAmount.amount} /> off
      </p>
      <p className="swp-price-savings">
        <Price price={lineItem.cost.subtotalAmount.amount} />
      </p>
    </div>
  ))
}

export default CartLineItemDiscounts
