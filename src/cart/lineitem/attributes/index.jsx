/** @jsx jsx */
import { jsx, css } from '@emotion/react'

function CartAttribute({ attribute }) {
	const attrWrapperCSS = css`
		display: flex;
		flex-direction: column;
		margin-top: 12px;
		border-top: 1px dashed #ddd;
		padding-top: 10px;
	`

	const attrCSS = css`
		font-weight: 400;
		font-size: 13px;
		color: black;
		margin-bottom: 0;
		margin-top: 0;
	`

	const attrKeyCSS = css`
		font-weight: bold;
	`

	return (
		<div css={attrWrapperCSS}>
			<p css={[attrCSS, attrKeyCSS]}>{attribute.key}</p>
			<p css={attrCSS}>{attribute.value}</p>
		</div>
	)
}

function CartAttributes({ lineItem }) {
	const CartAttributesCSS = css`
		margin-top: 10px;
	`
	return (
		<div css={CartAttributesCSS}>
			{lineItem.attributes.map(attribute => (
				<CartAttribute
					key={attribute.key + attribute.value}
					attribute={attribute}
				/>
			))}
		</div>
	)
}

export default CartAttributes
