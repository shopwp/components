import CartProvider from "./_state/provider"
import CartWrapper from "./wrapper"
import CartIconFixed from "./buttons/button/fixed"
import SettingsProvider from "../items/_state/settings/provider"

function Cart(props) {
  console.log("<Cart />")

  return shopwp.general.cartLoaded ? (
    <CartProvider {...props}>
      <SettingsProvider settings={props?.settings ? props.settings : false}>
        <CartWrapper />
        <CartIconFixed />
      </SettingsProvider>
    </CartProvider>
  ) : null
}

export default Cart
