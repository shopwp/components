import SellingGroupContent from "../selling-group-content"
import { useShopState } from "@shopwp/components"

function SellingGroupOnetime({ isSelected }) {
  const shopState = useShopState()

  return (
    <SellingGroupContent
      isSelected={isSelected}
      subType="onetime"
      text={shopState.t.l.oneTimePurchase}
    />
  )
}

export default SellingGroupOnetime
