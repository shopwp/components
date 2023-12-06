import { useProductBuyButtonDispatch } from "../../_state/hooks"
import { useShopState } from "@shopwp/components"
import { useSettingsState } from "../../../../../items/_state/settings/hooks"

const Dropdown = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Select-public' */ "../../../../../select")
)

function SellingPlansList({ plans, sellingGroup }) {
  const { useState, Suspense } = wp.element
  const buyButtonDispatch = useProductBuyButtonDispatch()
  const shopState = useShopState()
  const settings = useSettingsState()

  const newPlans = plans
    .map((plan) => {
      if (plan.type === "onetime") {
        return false
      }

      return {
        label: plan.external_plan_name,
        value: plan.external_plan_name,
      }
    })
    .filter(Boolean)

  const [selectedOption, setSelectedOption] = useState(newPlans[0])

  function onChange(value) {
    var found = plans.filter((p) => p.external_plan_name === value.value)

    var selectedSubscription = found[0]

    setSelectedOption(value)

    buyButtonDispatch({
      type: "SET_SUBSCRIPTION",
      payload: {
        sellingPlanId: selectedSubscription.id,
        sellingPlanName: selectedSubscription.external_plan_name,
        discountAmount: sellingGroup.discount_amount,
        discountType: sellingGroup.discount_type,
      },
    })
  }

  return (
    <Suspense fallback="Loading ...">
      <Dropdown
        settings={settings}
        items={newPlans}
        onChange={onChange}
        label={shopState.t.l.selectDelivery}
        selectedOption={selectedOption}
      />
    </Suspense>
  )
}

export default SellingPlansList
