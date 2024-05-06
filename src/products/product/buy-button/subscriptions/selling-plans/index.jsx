import SellingPlansList from "../selling-plans-list"
import { useSubscriptionsBuyButtonState } from "../_state/hooks"
import { useShopState } from "@shopwp/components"
import { useProductBuyButtonDispatch } from "../../_state/hooks"

const Notice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notice-public' */ "../../../../../notice")
)

function SellingPlans() {
  const { useEffect } = wp.element

  const state = useSubscriptionsBuyButtonState()
  const shopState = useShopState()
  const buyButtonDispatch = useProductBuyButtonDispatch()

  useEffect(() => {
    if (!state.sellingPlans.length) {
      return
    }

    buyButtonDispatch({
      type: "SET_SUBSCRIPTIONS",
      payload: state.sellingPlans,
    })
  }, [state.sellingPlans])

  return state.notice ? (
    <Notice status={state.notice.type} className="swp-subscription-notice">
      {state.notice.message}
    </Notice>
  ) : state.sellingPlans ? (
    <SellingPlansList plans={state.sellingPlans} />
  ) : (
    <Notice status="info" className="swp-subscription-notice">
      {shopState.t.w.noSubsFound}
    </Notice>
  )
}

export default SellingPlans
