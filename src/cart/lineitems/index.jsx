/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useShopState } from "@shopwp/components"
import { FilterHook } from "@shopwp/common"

const CartLineItem = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartLineItem-public' */ "../lineitem")
)

function CartLineItems() {
  const shopState = useShopState()

  const CartLineItemsCSS = css``

  return (
    <>
      <FilterHook name="before.cartLineItems" args={[shopState.cartData]} />
      <ul className="swp-cart-lineitems" css={CartLineItemsCSS}>
        {shopState.cartData.lines.edges.map((item) => (
          <CartLineItem key={item.node.id} lineItem={item.node} />
        ))}
      </ul>
      <FilterHook name="after.cartLineItems" args={[shopState.cartData]} />
    </>
  )
}

export default CartLineItems
