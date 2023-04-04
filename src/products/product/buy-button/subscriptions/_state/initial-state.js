import { getPrices } from "@shopwp/common"

function defaultSellingGroups(props) {
  if (props.payload && props.payload.requiresSellingPlan) {
    return [{ id: props.payload.id + "subscription" }]
  } else {
    return [
      { id: props.payload.id + "onetime" },
      { id: props.payload.id + "subscription" },
    ]
  }
}

function SubscriptionsBuyButtonInitialState(props) {
  return {
    id: props.payload ? props.payload.id : "",
    sellingGroups: props.payload ? defaultSellingGroups(props) : [],
    sellingPlans: false,
    isLoadingSellingGroups:
      props.payload && props.payload.requiresSellingPlan ? true : false,
    selectedSubscription:
      (props.payload && props.payload.requiresSellingPlan) ||
      (props.settings && props.settings.subscriptionsSelectOnLoad)
        ? props.payload.id + "subscription"
        : props.payload.id + "onetime",
    prices: getPrices(props.payload, "asc"),
    error: false,
    settings: props.settings,
  }
}

export default SubscriptionsBuyButtonInitialState
