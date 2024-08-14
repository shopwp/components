import SellingGroup from "../selling-group"
import { useSubscriptionsBuyButtonState } from "../_state/hooks"
import { isOneTimeSub, maybeFindFirstSellingPlan } from "@shopwp/common"
import { useProductState, useProductDispatch } from "../../../_state/hooks"

function SellingGroups() {
  const { useEffect } = wp.element
  const subscriptionsBuyButtonState = useSubscriptionsBuyButtonState()
  const productDispatch = useProductDispatch()
  const productState = useProductState()

  function setActiveSubscription(subType) {
    productDispatch({
      type: "SET_ACTIVE_SELLING_GROUP",
      payload: subType,
    })

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
  }

  /*
  
  subType can be either 'onetime' or 'subscription'
  
  */
  function onChange(e) {
    setActiveSubscription(e.target.value)
  }

  useEffect(() => {
    if (productState.selectedSubscription) {
      if (productState.selectedSubscription.recurringDeliveries) {
        setActiveSubscription("subscription")
      } else {
        setActiveSubscription("onetime")
      }
    } else {
      if (subscriptionsBuyButtonState.sellingGroups.length) {
        var firstSub = subscriptionsBuyButtonState.sellingGroups[0]

        setActiveSubscription(firstSub.id)
      }
    }
  }, [])

  return (
    <form onChange={onChange}>
      {subscriptionsBuyButtonState.sellingGroups.map((sellingGroup, index) => (
        <SellingGroup
          key={sellingGroup.id}
          subType={sellingGroup.id}
          isSelected={productState.activeSellingGroup === sellingGroup.id}
          index={index}
        />
      ))}
    </form>
  )
}

export default SellingGroups
