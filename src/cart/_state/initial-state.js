import defaults from "./defaults"
import { mergeDefaults } from "@shopwp/common"

function CartInitialState(props) {
  let settings = mergeDefaults(props.settings, defaults)

  return {
    settings: settings,
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
    productsVisible: false,
    customAttributes: [],
    note: false,
    isRemovingDiscountCode: false,
    isAddingDiscountCode: false,
    isAddingLineItems: false,
  }
}

export default CartInitialState
