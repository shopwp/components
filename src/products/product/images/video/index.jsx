/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import ReactPlayer from 'react-player/lazy'

function ProductFeaturedImageVideo({ videoData }) {
	const ProductFeaturedImageVideoCSS = css`
		position: relative;
		padding-top: 56.25%;

		.react-player {
			position: absolute;
			top: 0;
			left: 0;
		}
	`

	return (
		<div css={ProductFeaturedImageVideoCSS}>
			<ReactPlayer
				className='react-player'
				url={
					videoData.mediaContentType === 'EXTERNAL_VIDEO'
						? videoData.embeddedUrl
						: videoData.sources[0].url
				}
				controls={true}
				width='100%'
				height='100%'
			/>
		</div>
	)
}

export default ProductFeaturedImageVideo
