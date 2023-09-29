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
  const CartFooterSkeletonCSS = css``
  return (
    <div className="swp-cart-footer-skeleton" css={CartFooterSkeletonCSS}>
      <div></div>
      <div></div>
    </div>
  )
}

function CartFooter() {
  const cartState = useCartState()
  const shopState = useShopState()
  const { Suspense } = wp.element

  const CartFooterCSS = css``

  return (
    <section className="swp-cart-footer wps-cart-footer" css={CartFooterCSS}>
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
