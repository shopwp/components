import CartProvider from "./_state/provider"
import CartWrapper from "./wrapper"
import CartIconFixed from "./buttons/button/fixed"
import SettingsProvider from "../items/_state/settings/provider"

function Cart(props) {
  props.settings.type = "fixed"

  return shopwp.general.cartLoaded ? (
    <CartProvider {...props}>
      <SettingsProvider
        settings={props?.settings ? props.settings : false}
        componentType="cart"
      >
        <CartWrapper />
        <CartIconFixed />
      </SettingsProvider>
    </CartProvider>
  ) : null
}

export default Cart
