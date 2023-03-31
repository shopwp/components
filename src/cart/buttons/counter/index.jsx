/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useShopState } from "ShopState"

const Loader = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Loader-public' */ "../../../loader")
)

function CartCounter({ settings, totalLineItems, fixed = false }) {
  const shopState = useShopState()
  const { useRef, Suspense } = wp.element
  const element = useRef()

  function getColor() {
    if (fixed) {
      return settings.counterTextColor
    }

    return settings.counterTextColor
  }

  function getBackgroundColor() {
    if (fixed) {
      return settings.backgroundColor
    }

    return settings.counterBackgroundColor
  }

  const counterCSS = css`
    position: ${fixed ? "relative" : "absolute"};
    font-weight: normal;
    top: ${fixed ? "-4px" : "-12px"};
    right: -12px;
    left: ${fixed ? "1px" : "auto"};
    background: ${fixed
      ? "none"
      : settings.counterBackgroundColor
      ? settings.counterBackgroundColor
      : shopwp.general.cartCounterBackgroundColor};
    border-radius: 50%;
    display: inline-block;
    text-align: center;
    color: ${fixed ? "white" : "black"};
    font-size: ${fixed ? "18px" : "13px"};
    line-height: 1.7;
    z-index: 3;
    width: ${fixed ? "40px" : "25px"};
    height: 25px;
    max-height: 25px;
    padding: ${totalLineItems > 9 ? "1px 1px 0px 0px" : "1px 0px 0px 0px;"};
    font-weight: bold;
    overflow: ${fixed ? "visible" : "hidden"};
  `
  const customCounterCSS = css`
    background-color: ${getBackgroundColor()};
    color: ${getColor()};
  `

  const counterTextCSS = css`
    display: block;
    position: absolute;
    top: 49%;
    left: 49%;
    transform: translate(-50%, -50%);
    width: 100%;
    line-height: 1;
    overflow: hidden;
    max-height: 17px;
  `

  const counterLoaderCSS = css`
    margin: 0;
    background: transparent;
    height: 25px;

    .loader-inner > div:last-of-type,
    .loader-inner > div:first-of-type {
      display: ${fixed ? "inline-block" : "none"};
    }
  `

  const inlineCounterLoaderCSS = css`
		.loader-inner > div {
			background-color: transparent;
			width: 10px !important;
			height: 10px !important;
			position: relative;
      top: -1px;
		}

		.loader-inner > div:last-of-type,
		.loader-inner > div:first-of-type {
			display: none};
		}

		.wps-loader {
			top: 1px;
			left: 0px;
		}

	`

  return (
    <Suspense fallback={false}>
      {shopState.isCartUpdating && fixed ? (
        <Loader extraCSS={counterLoaderCSS} color={settings.counterTextColor} />
      ) : (
        <span
          css={[counterCSS, customCounterCSS]}
          className="wps-cart-counter"
          ref={element}
        >
          <span css={counterTextCSS}>
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
