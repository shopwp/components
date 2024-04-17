import SubscriptionDetails from "../details"

const SellingGroups = wp.element.lazy(() =>
  import(/* webpackChunkName: 'SellingGroups-public' */ "../selling-groups")
)

function SubscriptionsBuyButtonWrapper({ settings }) {
  const { Suspense } = wp.element

  return (
    <Suspense fallback={false}>
      <div className="swp-l-col swp-mb10 swp-mt15 swp-sub-wrapper">
        <SellingGroups />
        <SubscriptionDetails settings={settings} />
      </div>
    </Suspense>
  )
}

export default SubscriptionsBuyButtonWrapper
