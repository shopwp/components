import { useShopState } from "@shopwp/components"

function SubscriptionSkeleton() {
  const shopState = useShopState()

  return (
    <div className="swp-skeleton-subscription">
      <span className="swp-skeleton-subscription-loading">
        {shopState.t.l.loading} ...
      </span>
      <div></div>
      <div></div>
    </div>
  )
}

export default SubscriptionSkeleton
