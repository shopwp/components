import { RadioGroup } from "react-radio-group"
import SellingGroup from "../selling-group"
import {
  useSubscriptionsBuyButtonState,
  useSubscriptionsBuyButtonDispatch,
} from "../_state/hooks"
import {
  useProductBuyButtonState,
  useProductBuyButtonDispatch,
} from "../../_state/hooks"
import {
  isOneTimeSubscription,
  findSubscriptionFromProductId,
  getFirstSellingPlanData,
} from "@shopwp/common"

function SellingGroups() {
  const state = useSubscriptionsBuyButtonState()
  const dispatch = useSubscriptionsBuyButtonDispatch()
  const buyButtonState = useProductBuyButtonState()
  const buyButtonDispatch = useProductBuyButtonDispatch()

  function onChange(newValue) {
    dispatch({
      type: "SET_SELECTED_SUBSCRIPTION",
      payload: newValue,
    })

    if (isOneTimeSubscription(newValue)) {
      buyButtonDispatch({
        type: "SET_SUBSCRIPTION",
        payload: false,
      })
    } else {
      var foundSubscription = findSubscriptionFromProductId(
        newValue,
        buyButtonState
      )

      if (foundSubscription) {
        buyButtonDispatch({
          type: "SET_SUBSCRIPTION",
          payload: getFirstSellingPlanData(foundSubscription),
        })
      }
    }
  }

  return (
    <RadioGroup
      name={state.id + "subscriptions"}
      selectedValue={state.selectedSubscription}
      onChange={onChange}
    >
      {state.sellingGroups.map((sellingGroup) => (
        <SellingGroup
          key={sellingGroup.id}
          sellingGroup={sellingGroup}
          selectedSubscriptionId={state.selectedSubscription}
        />
      ))}
    </RadioGroup>
  )
}

export default SellingGroups
