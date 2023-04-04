import { rSet } from "@shopwp/common"

function CartReducer(state, action) {
  switch (action.type) {
    case "SET_IS_CHECKING_OUT": {
      return rSet("isCheckingOut", action, state)
    }

    case "SET_TERMS_ACCEPTED": {
      return rSet("termsAccepted", action, state)
    }

    case "SET_NOTICE": {
      return rSet("notice", action, state)
    }

    case "SET_IS_CART_EMPTY": {
      return rSet("isCartEmpty", action, state)
    }

    case "SET_CART_TOTAL": {
      return rSet("total", action, state)
    }

    case "SET_BEFORE_DISCOUNT_TOTAL": {
      return rSet("beforeDiscountTotal", action, state)
    }

    case "SET_DISCOUNT_CODE": {
      return rSet("discountCode", action, state)
    }

    case "SET_IS_REMOVING_DISCOUNT_CODE": {
      return rSet("isRemovingDiscountCode", action, state)
    }

    case "SET_IS_ADDING_DISCOUNT_CODE": {
      return rSet("isAddingDiscountCode", action, state)
    }

    case "SET_BUILD_NEW_CHECKOUT": {
      return rSet("buildNewCheckout", action, state)
    }

    case "SET_PERCENTAGE_OFF": {
      return rSet("percentageOff", action, state)
    }

    case "SET_AMOUNT_OFF": {
      return rSet("amountOff", action, state)
    }

    case "SET_IS_ADDING_LINEITEMS": {
      return rSet("isAddingLineItems", action, state)
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type} in CartReducer`)
    }
  }
}

export default CartReducer
