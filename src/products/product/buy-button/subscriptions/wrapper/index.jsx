/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import SubscriptionDetails from "../details"

const SellingGroups = wp.element.lazy(() =>
  import(/* webpackChunkName: 'SellingGroups-public' */ "../selling-groups")
)

function SubscriptionsBuyButtonWrapper() {
  const { Suspense } = wp.element
  const SubscriptionBuyButtonCSS = css`
    margin: 0px 0 25px 0;
    display: flex;
    flex-direction: column;
  `

  return (
    <Suspense fallback={false}>
      <div css={SubscriptionBuyButtonCSS}>
        <SellingGroups />
        <SubscriptionDetails translations={shopwp.t} />
      </div>
    </Suspense>
  )
}

export default SubscriptionsBuyButtonWrapper
