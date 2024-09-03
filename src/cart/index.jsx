import CartProvider from "./_state/provider"
import CartWrapper from "./wrapper"
import CartIconFixed from "./buttons/button/fixed"
import SettingsProvider from "../items/_state/settings/provider"
import { updateVariablesInCSS } from "@shopwp/common"

function Cart(props) {
  props.settings.type = "fixed"

  const { useEffect } = wp.element

  useEffect(() => {
    updateVariablesInCSS("cart", props.settings, props.element)
  }, [props])

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
