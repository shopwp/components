function SellingPlan({ plan }) {
  return (
    <option value={plan.external_plan_id}>{plan.external_plan_name}</option>
  )
}

export default SellingPlan
