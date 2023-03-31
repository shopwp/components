/** @jsx jsx */
import { jsx, css } from '@emotion/react'

function SellingPlanSingle({ plan }) {
	const SellingPlanSingleCSS = css`
		padding-left: 19px;
		margin-top: -7px;
		font-size: 13px;
		font-style: italic;
		margin-bottom: 17px;
		text-transform: lowercase;

		&:first-letter {
			text-transform: capitalize;
		}
	`

	return <p css={SellingPlanSingleCSS}> {plan.selling_plan_name}</p>
}

export default SellingPlanSingle
