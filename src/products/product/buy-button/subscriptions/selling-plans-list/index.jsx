import { useProductBuyButtonDispatch } from "../../_state/hooks"
import { useShopState } from "@shopwp/components"

const Select = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Select-public' */ "../../../../../select")
)

function SellingPlansList({ plans, sellingGroup }) {
  const { useState, Suspense } = wp.element
  const buyButtonDispatch = useProductBuyButtonDispatch()
  const shopState = useShopState()

  const newPlans = plans.map((plan) => {
    return {
      label: plan.selling_plan_name,
      value: plan.selling_plan_id,
    }
  })

  const [selectedOption, setSelectedOption] = useState(newPlans[0])

  function onChange(value) {
    setSelectedOption(value)

    buyButtonDispatch({
      type: "SET_SUBSCRIPTION",
      payload: {
        sellingPlanId: value.value,
        sellingPlanName: value.label,
        discountAmount: sellingGroup.include.product.discount_amount,
        discountType: sellingGroup.include.product.discount_type,
      },
    })
  }

  return (
    <Suspense fallback="Loading ...">
      <Select
        items={newPlans}
        onChange={onChange}
        label={shopState.t.l.selectDelivery}
        selectedOption={selectedOption}
      />
    </Suspense>
  )
}

export default SellingPlansList
