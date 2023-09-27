/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { IconLogo } from "@shopwp/components"
import { useShopState } from "@shopwp/components"

const Loader = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Loader-public' */ "../../loader")
)

function CartLoadingContents() {
  const shopState = useShopState()
  const { Suspense } = wp.element

  const updatingOverlayTextCSS = css``

  return (
    <Suspense fallback="Loading...">
      <div className="swp-cart-overlay" css={[updatingOverlayTextCSS]}>
        <IconLogo color="#000" />

        {shopState.t.l.updatingCart}

        <Loader color="#000" center={true} />
      </div>
    </Suspense>
  )
}

export default CartLoadingContents
