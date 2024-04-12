import { useShopState, Price } from "@shopwp/components"

function CartFooterSubtotal() {
  const shopState = useShopState()

  function findTotalDiscountAmount(discountAllocations) {
    return discountAllocations.reduce((currentValue, discount) => {
      if (!discount || !discount.discountedAmount) {
        return currentValue
      }

      return currentValue + parseFloat(discount.discountedAmount.amount)
    }, 0)
  }

  return (
    <div className="wps-subtotal-row swp-subtotal-row swp-l-col swp-l-col-end swp-l-row-between swp-0 swp-mt10">
      {shopState.cartData.discountAllocations.length ? (
        <div className="wps-total-amount swp-total-amount swp-l-col swp-l-rel100">
          <div className="swp-discount-item swp-l-row swp-m-l-row swp-l-col-end swp-l-row-between swp-0 swp-mt5">
            <p className="swp-0">{shopState.t.l.subtotal}</p>
            <p className="swp-0">
              <Price price={shopState.cartData.cost.subtotalAmount.amount} />
            </p>
          </div>
          <div className="swp-discount-item swp-discount-info swp-l-row swp-m-l-row swp-l-col-end swp-l-row-between swp-l-baseline swp-0 swp-mt5">
            <div className="swp-discount-code-wrap">
              <p className="swp-0">Discount:</p>
            </div>

            <p className="swp-discount-total swp-0">
              (&ndash;
              <Price
                price={findTotalDiscountAmount(
                  shopState.cartData.discountAllocations
                )}
              />
              )
            </p>
          </div>
        </div>
      ) : null}

      <div className="wps-total-amount swp-total-amount swp-l-row swp-m-l-row swp-l-row-between swp-mb5 swp-mt10">
        <p className="wps-total-prefix swp-total-prefix swp-0">
          {shopState.t.l.total}
        </p>
        {shopState.cartData && shopState.cartData?.cost ? (
          <p>
            <Price price={shopState.cartData.cost.totalAmount.amount} />
          </p>
        ) : null}
      </div>
    </div>
  )
}

export default CartFooterSubtotal
