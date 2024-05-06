import { RadioGroup } from "react-radio-group"
import SellingGroup from "../selling-group"
import { useSubscriptionsBuyButtonState } from "../_state/hooks"
import { isOneTimeSub, maybeFindFirstSellingPlan } from "@shopwp/common"
import { useProductState, useProductDispatch } from "../../../_state/hooks"

function SellingGroups() {
  const subscriptionsBuyButtonState = useSubscriptionsBuyButtonState()
  const productDispatch = useProductDispatch()
  const productState = useProductState()

  /*
  
  subType can be either 'onetime' or 'subscription'
  
  */
  function onChange(subType) {
    if (isOneTimeSub(subType)) {
      productDispatch({
        type: "SET_SELECTED_SUBSCRIPTION",
        payload: false,
      })
    } else {
      productDispatch({
        type: "SET_SELECTED_SUBSCRIPTION",
        payload: maybeFindFirstSellingPlan(productState.payload),
      })
    }

    productDispatch({
      type: "SET_ACTIVE_SELLING_GROUP",
      payload: subType,
    })
  }

  return (
    <RadioGroup
      name={subscriptionsBuyButtonState.id + "subscriptions"}
      selectedValue={productState.activeSellingGroup}
      onChange={onChange}
    >
      {subscriptionsBuyButtonState.sellingGroups.map((sellingGroup) => (
        <SellingGroup
          key={sellingGroup.id}
          subType={sellingGroup.id}
          isSelected={productState.activeSellingGroup === sellingGroup.id}
        />
      ))}
    </RadioGroup>
  )
}

export default SellingGroups
