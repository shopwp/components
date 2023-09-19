import { rSet, rErr } from "@shopwp/common"

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

    case "SET_CART_NOTE": {
      return rSet("note", action, state)
    }

    case "SET_DISCOUNT_CODE": {
      return rSet("discountCode", action, state)
    }

    case "SET_IS_ADDING_DISCOUNT_CODE": {
      return rSet("isAddingDiscountCode", action, state)
    }

    case "SET_PERCENTAGE_OFF": {
      return rSet("percentageOff", action, state)
    }

    case "SET_AMOUNT_OFF": {
      return rSet("amountOff", action, state)
    }

    default: {
      rErr(action, "Cart")
    }
  }
}

export default CartReducer
