import SellingGroupContent from "../selling-group-content"
import SellingPlans from "../selling-plans"
import { useShopState } from "@shopwp/components"

function SellingGroupSubscription({ isSelected, index }) {
  const shopState = useShopState()

  return (
    <>
      <SellingGroupContent
        isSelected={isSelected}
        subType="subscription"
        text={shopState.t.l.subscription}
        index={index}
      />

      <SellingPlans />
    </>
  )
}

export default SellingGroupSubscription
