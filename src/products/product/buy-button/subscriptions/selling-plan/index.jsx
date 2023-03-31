function SellingPlan({ plan }) {
    return <option value={plan.selling_plan_id}>{plan.selling_plan_name}</option>
  }

  export default SellingPlan;