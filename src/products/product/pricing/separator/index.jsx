/** @jsx jsx */
import { jsx, css } from '@emotion/react'

function ProductPricingSeparator({ compareAt }) {
	const ProductPricingSeparatorCSS = css`
		margin: ${compareAt ? '0 0 0 5px' : '0 5px'};
		display: inline-block;
		color: ${compareAt ? '#848484' : '#121212'};
		position: ${compareAt ? 'static' : 'relative'};
		top: ${compareAt ? 0 : '-2px'};
	`

	return (
		<div
			css={ProductPricingSeparatorCSS}
			className='wps-product-from-price-separator'>
			–
		</div>
	)
}

export { ProductPricingSeparator }
