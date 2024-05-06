import { rSet, rErr } from "@shopwp/common"

function SubscriptionsBuyButtonReducer(state, action) {
  switch (action.type) {
    case "SET_SELLING_PLANS": {
      return rSet("sellingPlans", action, state)
    }

    case "SET_IS_LOADING_SELLING_GROUPS": {
      return rSet("isLoadingSellingGroups", action, state)
    }

    case "SET_NOTICE": {
      return rSet("notice", action, state)
    }

    default: {
      rErr(action, "SubscriptionsBuyButton")
    }
  }
}

export default SubscriptionsBuyButtonReducer
