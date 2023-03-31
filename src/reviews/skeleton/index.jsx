/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/react"

function ReviewsSkeleton() {
  const shimmer = keyframes`
      0% {
        opacity: 0.5;
      }
  
      100% {
        opacity: 1;
      }
    `

  const ReviewsSkeletonCSS = css`
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin-top: -5px;
    margin-bottom: 5px;
  `

  const ReviewsSkeletonCtaCSS = css`
    height: 24px;
    border-radius: 10px;
    animation: ${shimmer} 0.4s ease-out 0s alternate infinite none running;
    background: #eee;
    margin-bottom: 15px;
  `

  return (
    <div css={ReviewsSkeletonCSS}>
      <div css={ReviewsSkeletonCtaCSS}></div>
    </div>
  )
}

export default ReviewsSkeleton
