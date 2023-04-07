import defaults from "./defaults"
import { mergeDefaults } from "@shopwp/common"

function CartInitialState(props) {
  return {
    settings: mergeDefaults(props.settings, defaults),
    isCheckingOut: false,
    isCartOpen: false,
    termsAccepted: false,
    isCartEmpty: true,
    buttons: props.element,
    notice: false,
    discountCode: "",
    total: 0,
    buildNewCheckout: false,
    beforeDiscountTotal: false,
    percentageOff: false,
    amountOff: false,
    customAttributes: [],
    note: false,
    isRemovingDiscountCode: false,
    isAddingDiscountCode: false,
    isAddingLineItems: false,
  }
}

export default CartInitialState
