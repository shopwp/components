/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import SellingPlanSingle from "../selling-plan-single"
import SellingPlansList from "../selling-plans-list"
import {
  useSubscriptionsBuyButtonDispatch,
  useSubscriptionsBuyButtonState,
} from "../_state/hooks"

import { useShopState } from "@shopwp/components"
import { useProductBuyButtonDispatch } from "../../_state/hooks"
import {
  getRechargeSellingGroupsFromProductId,
  maybeHandleApiError,
} from "@shopwp/api"
import { to, getFirstSellingPlanData } from "@shopwp/common"

import SubscriptionSkeleton from "../skeleton"

const Notice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notice-public' */ "../../../../../notice")
)

function SellingPlans({ sellingGroup, setSellingGroup }) {
  const { useEffect } = wp.element

  const dispatch = useSubscriptionsBuyButtonDispatch()
  const state = useSubscriptionsBuyButtonState()
  const shopState = useShopState()
  const buyButtonDispatch = useProductBuyButtonDispatch()

  const SubscriptionBuyButtonNoticeCSS = css`
    max-width: 87%;
    display: block;
    margin: 0 auto 16px auto;
    font-size: 14px;
    background: white;
    color: black;
  `

  async function fetchSellingGroups(productId) {
    dispatch({
      type: "SET_IS_LOADING_SELLING_GROUPS",
      payload: true,
    })

    const [error, resp] = await to(
      getRechargeSellingGroupsFromProductId(
        {
          shopify_product_id: productId,
        },
        shopState
      )
    )

    dispatch({
      type: "SET_IS_LOADING_SELLING_GROUPS",
      payload: false,
    })

    var errMsg = maybeHandleApiError(error, resp)

    if (errMsg) {
      dispatch({
        type: "SET_NOTICE",
        payload: {
          type: "error",
          message: errMsg,
        },
      })
      return
    }

    if (!resp.data) {
      return
    }

    setSellingGroup(resp.data[0])

    dispatch({
      type: "SET_SELLING_PLANS",
      payload: resp.data,
    })

    buyButtonDispatch({
      type: "SET_SUBSCRIPTIONS",
      payload: resp.data,
    })

    buyButtonDispatch({
      type: "SET_SUBSCRIPTION",
      payload: getFirstSellingPlanData(resp.data),
    })
  }

  useEffect(() => {
    if (sellingGroup) {
      return
    }

    if (!state || !state.id) {
      return
    }

    fetchSellingGroups(state.id)
  }, [sellingGroup])

  return state.isLoadingSellingGroups ? (
    <SubscriptionSkeleton />
  ) : state.notice ? (
    <Notice
      extraCSS={SubscriptionBuyButtonNoticeCSS}
      status={state.notice.type}
    >
      {state.notice.message}
    </Notice>
  ) : state.sellingPlans ? (
    state.sellingPlans.length === 1 ? (
      <SellingPlanSingle plan={state.sellingPlans[0]} />
    ) : (
      <SellingPlansList
        plans={state.sellingPlans}
        sellingGroup={sellingGroup}
      />
    )
  ) : (
    <Notice extraCSS={SubscriptionBuyButtonNoticeCSS} status="info">
      {shopState.t.w.noSubsFound}
    </Notice>
  )
}

export default SellingPlans
