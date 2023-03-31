/** @jsx jsx */
import { jsx, css } from '@emotion/react'

function StorefrontFilter({ heading, children, isOpen, setIsOpen }) {
	const filterHeadingCSS = css`
		font-size: 16px;
		background: blue;
		background: transparent;
		padding: 12px 15px;
		margin: 0;
		position: relative;
		border-bottom: ${isOpen ? 'none' : '1px solid #ccc'};

		&:hover {
			cursor: pointer;
		}
	`

	const drawerIconCSS = css`
		position: absolute;
		width: 12px;
		height: 12px;
		display: inline-block;
		right: 15px;
		top: calc(50% - 7px);

		&:before,
		&:after {
			content: '';
			position: absolute;
			background-color: #3d3d3d;
			transition: transform 0.3s ease;
		}

		&:before {
			top: 0;
			left: calc(50% - 1px);
			width: 2px;
			height: 100%;
			margin-left: -1px;
			transform: ${isOpen ? 'rotate(90deg)' : 'rotate(180deg)'};
		}

		&:after {
			top: 50%;
			left: -1px;
			width: 100%;
			height: 2px;
			margin-top: -1px;
		}
	`

	const FilterCSS = css`
		margin: 0;

		.wps-drawer-trigger {
			margin-top: 0;
			margin-bottom: 0;
		}

		+ .wps-filter {
			border-top: ${isOpen ? '1px solid #ccc;' : 'none'};
		}
	`

	const drawerContentCSS = css`
		max-height: ${isOpen ? '350px' : '0'};
		overflow: ${isOpen ? 'scroll' : 'hidden'};
	`

	return (
		<div className='wps-filter' css={FilterCSS} data-wps-drawer-toggle={isOpen}>
			<h3
				className='wps-drawer-trigger wps-filter-heading'
				css={filterHeadingCSS}
				onClick={setIsOpen}>
				{heading}
				<span className='wps-drawer-icon' css={drawerIconCSS} />
			</h3>
			<div className='wps-drawer-content' css={drawerContentCSS}>
				{children}
			</div>
		</div>
	)
}

export { StorefrontFilter }
