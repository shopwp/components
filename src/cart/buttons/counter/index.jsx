import { useShopState } from "@shopwp/components"

const Loader = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Loader-public' */ "../../../loader")
)

function CartCounter({ totalLineItems, fixed = false }) {
  const shopState = useShopState()
  const { useRef, Suspense } = wp.element
  const element = useRef()

  return (
    <Suspense fallback={false}>
      {shopState.isCartUpdating && fixed ? (
        <Loader />
      ) : (
        <span className="swp-cart-counter wps-cart-counter" ref={element}>
          <span
            className="swp-cart-counter-text"
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
