import { rSet, rErr } from "@shopwp/common"
import { findIdentifiersFromOrders } from "../utils"

function AccountReducer(state, action) {
  switch (action.type) {
    case "SET_ACTIVE_VIEW": {
      return rSet("activeView", action, state)
    }

    case "SET_IS_BOOTSTRAPPING": {
      return rSet("isBootstrapping", action, state)
    }

    case "SET_NOTICE": {
      return rSet("notice", action, state)
    }

    case "SET_CUSTOMER": {
      var stateOne = rSet("customer", action, state)
      return stateOne
      // var stateTwo = rSet(
      //   "metafieldIdentifiers",
      //   { payload: findIdentifiersFromOrders(stateOne.customer.orders) },
      //   stateOne
      // )

      return stateTwo
    }

    case "SET_LOGOUT_URL": {
      return rSet("logoutUrl", action, state)
    }

    case "SET_IS_WORKING": {
      return rSet("isWorking", action, state)
    }

    default: {
      rErr(action, "Account")
    }
  }
}

export default AccountReducer
