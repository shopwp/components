import defaults from "./defaults"
import { mergeDefaults } from "@shopwp/common"

function CartInitialState(props) {
  return {
    settings: mergeDefaults(props.settings, defaults),
    isCartOpen: false,
    termsAccepted: false,
    buttons: props.element,
    notice: false,
    discountCode: "",
    total: 0,
    percentageOff: false,
    amountOff: false,
    customAttributes: [],
    note: false,
    isAddingDiscountCode: false,
    inventoryErrors: false,
  }
}

export default CartInitialState
