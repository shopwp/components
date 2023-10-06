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
  const counterLoaderCSS = css``
  const inlineCounterLoaderCSS = css``

  return (
    <Suspense fallback={false}>
      {shopState.isCartUpdating && fixed ? (
        <Loader extraCSS={counterLoaderCSS} color={settings.counterTextColor} />
      ) : (
        <span
          css={[counterCSS, customCounterCSS]}
          className="swp-cart-counter wps-cart-counter"
          ref={element}
        >
          <span className="swp-cart-counter-text" css={counterTextCSS}>
            {shopState.isCartUpdating ? (
              <Loader
                extraCSS={inlineCounterLoaderCSS}
                color={settings.counterTextColor}
              />
            ) : (
              totalLineItems
            )}
          </span>
        </span>
      )}
    </Suspense>
  )
}

export default CartCounter
