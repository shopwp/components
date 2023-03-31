/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import Select from "react-select"
import { useProductBuyButtonDispatch } from "../../_state/hooks"
import { useShopState } from "ShopState"

function SellingPlansList({ plans, sellingGroup }) {
  const { useState } = wp.element
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

  const SellingPlansListCSS = css`
    max-width: 90%;
    margin: 0 auto 15px auto;

    &:hover {
      cursor: pointer;
    }

    div:hover {
      cursor: pointer;
    }
  `

  return (
    <Select
      css={SellingPlansListCSS}
      value={selectedOption}
      onChange={onChange}
      options={newPlans}
      placeholder={shopState.t.l.selectDelivery}
    />
  )
}

export default SellingPlansList
