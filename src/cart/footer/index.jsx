import { useCartState, useShopState } from "@shopwp/components"

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

const CartAttributes = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'CartAttributes-public' */ "../lineitem/attributes"
  )
)

const Notice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notice-public' */ "../../notice")
)

function CartFooterSkeleton() {
  return (
    <div className="swp-cart-footer-skeleton">
      <div></div>
      <div></div>
    </div>
  )
}

function hideCertainAttributes(attrs) {
  var attrKeysToHide = ["ShopWP Site"]

  return attrs.filter((attr) => !attrKeysToHide.includes(attr.key))
}

function CartFooter() {
  const cartState = useCartState()
  const shopState = useShopState()
  const { Suspense } = wp.element

  const orderAttributes = hideCertainAttributes(
    wp.hooks.applyFilters(
      "cart.visibleCartAttributes",
      shopState.cartData.attributes
    )
  )

  return (
    <section
      className="swp-cart-footer wps-cart-footer"
      data-is-showing-cart-notes={shopwp.general.enableCartNotes}
      data-is-showing-cart-terms={shopwp.general.enableCartTerms}
      data-is-showing-cart-discount={shopwp.general.enableDiscountCodes}
    >
      <Suspense fallback={<CartFooterSkeleton />}>
        {shopState.cartData && orderAttributes.length ? (
          <div className="swp-mb20 swp-cart-attrs-footer">
            <p className="swp-cart-attrs-heading">Order attributes:</p>
            <CartAttributes
              attributes={orderAttributes}
              cartData={shopState.cartData}
            />
          </div>
        ) : null}
        {shopwp.general.enableCartNotes ? <CartNote /> : null}
        {shopwp.general.enableCartTerms ? (
          <CartTerms termsAccepted={cartState.termsAccepted} />
        ) : null}
        {cartState.notice ? (
          <Notice status={cartState.notice.type}>
            {cartState.notice.message}
          </Notice>
        ) : null}

        {shopState.cartData ? <CartFooterTotal /> : null}

        <CartCheckout />
      </Suspense>
    </section>
  )
}

export default CartFooter
