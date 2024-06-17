import { findSubscriptionByName } from "@shopwp/common"
import { useSettingsState } from "../../../../../items/_state/settings/hooks"
import { useProductDispatch, useProductState } from "../../../_state/hooks"

const Dropdown = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Select-public' */ "../../../../../select")
)

function SellingPlansList({ plans }) {
  const { useState, Suspense } = wp.element
  const settings = useSettingsState()

  const productState = useProductState()
  const productDispatch = useProductDispatch()

  const newPlans = wp.hooks.applyFilters(
    "product.subscriptionPlanLabels",
    plans
      .map((plan) => {
        if (plan.node.type === "onetime") {
          return false
        }

        return {
          label: plan.node.name,
          value: plan.node.name,
        }
      })
      .filter(Boolean)
  )

  const [selectedOption, setSelectedOption] = useState(newPlans[0])

  function onChange(value) {
    var sellingPlan = findSubscriptionByName(plans, value.value)

    setSelectedOption(value)

    if (sellingPlan) {
      productDispatch({
        type: "SET_SELECTED_SUBSCRIPTION",
        payload: sellingPlan,
      })
    }
  }

  return (
    <Suspense fallback="Loading subscriptions ...">
      <Dropdown
        settings={settings}
        items={newPlans}
        onChange={onChange}
        label={false}
        selectedOption={selectedOption}
        productState={productState}
      />
    </Suspense>
  )
}

export default SellingPlansList
