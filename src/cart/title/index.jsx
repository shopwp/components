/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { FilterHook } from "@shopwp/common"
import { useCartState } from "@shopwp/components"
import { useShopState } from "@shopwp/components"

function CartTitle() {
  const cartState = useCartState()
  const shopState = useShopState()

  const CartTitleWrap = css`
    flex: 1;
  `

  const cartTitleCSS = css`
    color: #333;
    display: inline-block;
    font-weight: normal;
    font-size: 20px;
    line-height: 1.5;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0;

    &:before,
    &:after {
      display: none;
    }
  `

  return (
    <div className="wps-cart-title-wrap" css={CartTitleWrap}>
      <FilterHook name="before.cartTitle" args={[cartState]} />

      <h2 className="wps-cart-title" css={cartTitleCSS}>
        {shopState.t.l.cartTitle}
      </h2>

      <FilterHook name="after.cartTitle" args={[cartState]} />
    </div>
  )
}

export default CartTitle
