/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useCartState } from "@shopwp/components"
import { useShopState } from "@shopwp/components"

const CartFooterTotal = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartFooterTotal-public' */ "./total")
)

const CartCheckout = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartCheckout-public' */ "../checkout")
)

const CartNote = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartNote-public' */ "../note")
)

const CartTerms = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartTerms-public' */ "../terms")
)

const Notice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notice-public' */ "../../notice")
)

function CartFooterSkeleton() {
  const CartFooterSkeletonCSS = css`
    display: flex;
    flex-direction: column;

    > div {
      width: 100%;
      height: 50px;
      background: #e7e7e7;
      border-radius: 10px;
      margin-top: 8px;
    }
  `
  return (
    <div css={CartFooterSkeletonCSS}>
      <div></div>
      <div></div>
    </div>
  )
}

function CartFooter() {
  const cartState = useCartState()
  const shopState = useShopState()
  const { Suspense } = wp.element

  const CartFooterCSS = css`
    padding: 1em 0 0 0;
    margin: auto 0 0 0;
    border-top: 1px solid #ddd;
    font-size: 26px;
    color: #121212;
    transition: all 0.2s ease;
    opacity: ${shopState.isCartUpdating ? "0.3" : "1"};
    filter: ${shopState.isCartUpdating ? "blur(2px)" : "none"};

    p {
      margin: 0;
    }

    .wps-notices-cart {
      margin-bottom: 13px;
      max-width: 100%;
    }
  `

  return (
    <section className="wps-cart-footer" css={CartFooterCSS}>
      <Suspense fallback={<CartFooterSkeleton />}>
        {shopwp.general.enableCartNotes ? <CartNote /> : null}
        {shopwp.general.enableCartTerms ? (
          <CartTerms termsAccepted={cartState.termsAccepted} />
        ) : null}
        {cartState.notice ? (
          <Notice status={cartState.notice.type}>
            {cartState.notice.message}
          </Notice>
        ) : null}

        {shopState.cartData ? <CartFooterTotal cartState={cartState} /> : null}

        <CartCheckout />
      </Suspense>
    </section>
  )
}

export default CartFooter
