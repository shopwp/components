/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/react"
import { useShopState } from "ShopState"

function SubscriptionSkeleton() {
  const shopState = useShopState()

  const shimmer = keyframes`
      0% {
        opacity: 0.5;
      }
  
      100% {
        opacity: 1;
      }
    `

  const SubscriptionSkeletonCSS = css`
    display: flex;
    flex-direction: column;
    margin: 10px 0 15px 0;

    > div {
      width: 88%;
      height: 20px;
      margin: 0 auto 13px auto;
      border-radius: 15px;
      background: #dfe1f4;
      animation: ${shimmer} 0.4s ease-out 0s alternate infinite none running;
    }
  `

  const SubscriptionSkeletonLoadingCSS = css`
    padding-left: 23px;
    display: inline-block;
    margin: 0 0 10px 0;
    font-size: 14px;
  `

  return (
    <div css={SubscriptionSkeletonCSS}>
      <span css={SubscriptionSkeletonLoadingCSS}>
        {shopState.t.l.loading} ...
      </span>
      <div></div>
      <div></div>
    </div>
  )
}

export default SubscriptionSkeleton
