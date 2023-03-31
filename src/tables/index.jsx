/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/react'

function Table({ children, extraCSS }) {
	const slide = keyframes`
      0% {
         transform: translateX(90px);
         opacity: 0;
      }

      100% {
         transform: translateX(0);
         opacity: 1;
      }`

	const stylesTable = {
		width: '100%',
		border: '1px solid #e7e7e7',
		borderCollapse: 'collapse',
		borderSpacing: 0,
		opacity: 1,
		animation: slide + ' 0.3s ease',
	}

	return (
		<table css={[stylesTable, extraCSS]} className='wpshopify-table'>
			{children}
		</table>
	)
}

export { Table }
