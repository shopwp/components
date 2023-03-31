import { rSet } from "Common"

function SubscriptionsBuyButtonReducer(state, action) {
  switch (action.type) {
    case "SET_SELLING_PLANS": {
      return rSet("sellingPlans", action, state)
    }

    case "SET_IS_LOADING_SELLING_GROUPS": {
      return rSet("isLoadingSellingGroups", action, state)
    }

    case "SET_SELECTED_SUBSCRIPTION": {
      return rSet("selectedSubscription", action, state)
    }

    case "SET_NOTICE": {
      return rSet("notice", action, state)
    }

    default: {
      throw new Error(
        `Unhandled action type: ${action.type} in SubscriptionsBuyButtonReducer`
      )
    }
  }
}

export default SubscriptionsBuyButtonReducer
