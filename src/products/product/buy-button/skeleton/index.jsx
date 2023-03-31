/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/react'

function BuyButtonSkeleton() {
	const shimmer = keyframes`
      0% {
        opacity: 0.5;
      }
  
      100% {
        opacity: 1;
      }
    `

	const BuyButtonSkeletonCSS = css`
		display: flex;
		flex-direction: column;
		max-width: 300px;
	`

	const buyButtonCtaCSS = css`
		height: 40px;
		border-radius: 15px;
		animation: ${shimmer} 0.4s ease-out 0s alternate infinite none running;
		background: #eee;
		margin-top: 15px;
	`

	const BuyButtonSkeletonRowCSS = css`
		display: flex;
		justify-content: space-between;
	`

	const VariantCSS = css`
		margin: 0;
		border-radius: 15px;
		width: 30%;
		max-width: 30%;
		flex: 0 0 30%;
		height: 20px;
		border-radius: 15px;
		animation: ${shimmer} 0.4s ease-out 0s alternate infinite none running;
		background: #eee;
	`

	return (
		<div css={BuyButtonSkeletonCSS}>
			<div css={BuyButtonSkeletonRowCSS}>
				<div css={VariantCSS}></div>
				<div css={VariantCSS}></div>
				<div css={VariantCSS}></div>
			</div>

			<div css={buyButtonCtaCSS}></div>
		</div>
	)
}

export default BuyButtonSkeleton
