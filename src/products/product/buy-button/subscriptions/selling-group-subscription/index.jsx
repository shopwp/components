import { useSubscriptionsBuyButtonState } from "../_state/hooks"
import SellingGroupContent from "../selling-group-content"
import SellingPlans from "../selling-plans"
import { isOneTimeSubscription } from "Common"
import { useShopState } from "ShopState"

function SellingGroupSubscription({
  isSelected,
  selectedSubscriptionId,
  sellingGroupId,
}) {
  const { useState } = wp.element
  const [sellingGroup, setSellingGroup] = useState(false)
  const state = useSubscriptionsBuyButtonState()
  const shopState = useShopState()

  return (
    <>
      <SellingGroupContent
        sellingGroup={sellingGroup}
        isSelected={isSelected}
        value={sellingGroupId}
        text={shopState.t.l.subscription}
      />

      {!isOneTimeSubscription(selectedSubscriptionId) ||
      state.settings.subscriptionsAutoload ? (
        <SellingPlans
          sellingGroup={sellingGroup}
          setSellingGroup={setSellingGroup}
        />
      ) : null}
    </>
  )
}

export default SellingGroupSubscription
