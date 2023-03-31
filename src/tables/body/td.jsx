/** @jsx jsx */
import { jsx, css } from '@emotion/react'

function Td({ children, extraCSS, colspan, align }) {
	const styles = {
		textAlign: align ? align : 'left',
		padding: '15px',
		border: '1px solid #e7e7e7',
	}

	return (
		<td
			colSpan={colspan}
			css={[styles, extraCSS]}
			className='wpshopify-table-body-cell'>
			{children}
		</td>
	)
}

export { Td }
