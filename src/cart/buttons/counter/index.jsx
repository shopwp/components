/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useShopState } from "@shopwp/components"

const Loader = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Loader-public' */ "../../../loader")
)

function CartCounter({ settings, totalLineItems, fixed = false }) {
  const shopState = useShopState()
  const { useRef, Suspense } = wp.element
  const element = useRef()

  const counterCSS = css``
  const customCounterCSS = css``
  const counterTextCSS = css``

  return (
    <Suspense fallback={false}>
      {shopState.isCartUpdating && fixed ? (
        <Loader />
      ) : (
        <span
          css={[counterCSS, customCounterCSS]}
          className="swp-cart-counter wps-cart-counter"
          ref={element}
        >
          <span
            className="swp-cart-counter-text"
            css={counterTextCSS}
            aria-label={"Number of items in cart: " + totalLineItems}
          >
            {shopState.isCartUpdating ? <Loader /> : totalLineItems}
          </span>
        </span>
      )}
    </Suspense>
  )
}

export default CartCounter
