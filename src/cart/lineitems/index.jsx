/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useTrail, animated } from "react-spring"
import { useShopState } from "@shopwp/components"
import { FilterHook } from "@shopwp/common"

const CartLineItem = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartLineItem-public' */ "../lineitem")
)

function CartLineItems() {
  const shopState = useShopState()

  const trail = useTrail(shopState.cartData.lines.edges.length, {
    from: {
      y: -50,
    },
    to: {
      y: 0,
    },
    config: { tension: 120, friction: 20 },
  })

  const CartLineItemsCSS = css`
    list-style: none;
    padding: 0;
    margin: 0;

    li:last-child .wps-cart-lineitem {
      border: none;
    }
  `

  return (
    <>
      <FilterHook name="before.cartLineItems" args={[shopState.cartData]} />
      <ul css={CartLineItemsCSS}>
        {trail.map((styles, i) => {
          const item = shopState.cartData.lines.edges[i]

          return (
            <animated.li style={styles} key={item.node.id}>
              <CartLineItem key={item.node.id} lineItem={item.node} index={i} />
            </animated.li>
          )
        })}
      </ul>
      <FilterHook name="after.cartLineItems" args={[shopState.cartData]} />
    </>
  )
}

export default CartLineItems
