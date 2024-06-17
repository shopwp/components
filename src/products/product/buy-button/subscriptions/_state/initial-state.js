import { getPrices } from "@shopwp/common"

function defaultSellingGroups(props) {
  if (
    (props.payload && props.payload.requiresSellingPlan) ||
    props.settings.subscriptionsHideOnetime
  ) {
    return [{ id: "subscription" }]
  } else {
    return [{ id: "onetime" }, { id: "subscription" }]
  }
}

function SubscriptionsBuyButtonInitialState(props) {
  return {
    id: props.payload ? props.payload.id : "",
    activeSellingGroup: "onetime",
    sellingGroups: props.payload ? defaultSellingGroups(props) : [],
    sellingPlans: props.payload.sellingPlanGroups
      ? props.payload.sellingPlanGroups.edges[0].node.sellingPlans.edges
      : false,
    isLoadingSellingGroups:
      props.payload && props.payload.requiresSellingPlan ? true : false,
    prices: getPrices(props.payload, "asc"),
    error: false,
    settings: props.settings,
  }
}

export default SubscriptionsBuyButtonInitialState
