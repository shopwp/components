import SellingGroupContent from "../selling-group-content"
import { useProductDispatch } from "../../../_state/hooks"
import { useShopState } from "@shopwp/components"

function SellingGroupOnetime({ isSelected, sellingGroup }) {
  const { useEffect } = wp.element
  const productDispatch = useProductDispatch()
  const shopState = useShopState()

  useEffect(() => {
    if (isSelected) {
      productDispatch({
        type: "SET_SELECTED_SUBSCRIPTION_INFO",
        payload: false,
      })
    }
  }, [isSelected])

  return (
    <SellingGroupContent
      sellingGroup={sellingGroup}
      isSelected={isSelected}
      value={sellingGroup.id}
      text={shopState.t.l.oneTimePurchase}
    />
  )
}

export default SellingGroupOnetime
