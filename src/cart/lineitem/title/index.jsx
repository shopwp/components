/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useShopState } from "@shopwp/components"

const Link = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Link-public' */ "../../../link")
)

function CartLineItemSubscriptionTitle({ subscriptionName }) {
  const shopState = useShopState()
  const CartLineItemSubscriptionTitleCSS = css``

  return (
    <p className="swp-cart-sub-title" css={CartLineItemSubscriptionTitleCSS}>
      {wp.hooks.applyFilters(
        "cart.lineItemSubscriptionDescription",
        shopState.t.l.subscription + ": " + subscriptionName
      )}
    </p>
  )
}

function CartLineItemTitle({ lineItem, settings }) {
  const manualLink = wp.hooks.applyFilters(
    "cart.lineItemsLink",
    lineItem?.shopwp ? lineItem.shopwp.url : false,
    lineItem
  )

  const CartLineItemTitleCSS = css``

  const CartLineItemTitleWrapperCSS = css``

  return (
    <Link
      payload={lineItem.merchandise}
      type="products"
      from="cart"
      classNames="wps-cart-lineitem-title-link"
      target={settings.lineitemsLinkTarget}
      manualLink={manualLink}
      linkTitle={lineItem.merchandise.product.title}
    >
      <div
        className="swp-cart-lineitem-wrapper"
        css={CartLineItemTitleWrapperCSS}
      >
        <span
          className="swp-cart-lineitem-title wps-cart-lineitem-title-content"
          css={CartLineItemTitleCSS}
          data-has-link={!!manualLink}
        >
          {wp.hooks.applyFilters(
            "cart.lineItemTitleText",
            lineItem.merchandise.product.title,
            lineItem
          )}
        </span>
        {lineItem.sellingPlanAllocation ? (
          <CartLineItemSubscriptionTitle
            subscriptionName={lineItem.sellingPlanAllocation.sellingPlan.name}
          />
        ) : null}
      </div>
    </Link>
  )
}

export default CartLineItemTitle
