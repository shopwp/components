import { useShopState } from "@shopwp/components"

const Link = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Link-public' */ "../../../link")
)

function CartLineItemSubscriptionTitle({ lineItem }) {
  const shopState = useShopState()

  return (
    <p className="swp-cart-sub-title">
      {wp.hooks.applyFilters(
        "cart.lineItemSubscriptionDescription",
        shopState.t.l.subscription +
          ": " +
          lineItem.sellingPlanAllocation.sellingPlan.name,
        lineItem
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

  return (
    <Link
      payload={lineItem.merchandise}
      type="products"
      from="cart"
      classNames="wps-cart-lineitem-title-link"
      target={settings.lineitemsLinkTarget}
      manualLink={manualLink}
    >
      <div className="swp-cart-lineitem-wrapper">
        <span
          className="swp-cart-lineitem-title wps-cart-lineitem-title-content"
          data-has-link={!!manualLink}
        >
          {wp.hooks.applyFilters(
            "cart.lineItemTitleText",
            lineItem.merchandise.product.title,
            lineItem
          )}
        </span>
        {lineItem.sellingPlanAllocation ? (
          <CartLineItemSubscriptionTitle lineItem={lineItem} />
        ) : null}
      </div>
    </Link>
  )
}

export default CartLineItemTitle
