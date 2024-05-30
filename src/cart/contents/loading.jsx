import { IconLogo } from "@shopwp/components"
import { useShopState } from "@shopwp/components"

const Loader = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Loader-public' */ "../../loader")
)

function CartLoadingContents() {
  const shopState = useShopState()
  const { Suspense } = wp.element

  return (
    <Suspense fallback="Loading...">
      <div className="swp-cart-overlay">
        <IconLogo color="#000" />

        {shopState.t.l.updatingCart}

        <Loader />
      </div>
    </Suspense>
  )
}

export default CartLoadingContents
