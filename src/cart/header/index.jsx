import CartTitle from "../title"
import CartClose from "../close"

function CartHeader({ settings }) {
  return (
    <section className="swp-l-rel100 swp-cart-header wps-cart-header">
      <div className="swp-l-row swp-cart-header-inner">
        {settings.showCartTitle ? <CartTitle /> : null}
        {settings.showCartCloseIcon ? <CartClose /> : null}
      </div>
    </section>
  )
}

export default CartHeader
