/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { mq } from "Common"
import { useShopState } from "ShopState"

const Link = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Link-public' */ "../../../link")
)

function CartLineItemSubscriptionTitle({ subscriptionName }) {
  const shopState = useShopState()
  const CartLineItemSubscriptionTitleCSS = css`
    margin-top: -2px;
    font-size: 13px;
    font-style: italic;
    color: #464646;
    margin-bottom: 11px;
    text-transform: lowercase;
    max-width: 100%;

    &:first-letter {
      text-transform: capitalize;
    }
  `

  return (
    <p css={CartLineItemSubscriptionTitleCSS}>
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

  const CartLineItemTitleCSS = css`
    display: inline-block;
    line-height: 1.3;
    max-width: 245px;
    margin-bottom: 4px;
    font-weight: bold;
    color: black;

    &:hover {
      text-decoration: ${manualLink ? "underline" : "none"};
    }

    ${mq("small")} {
      line-height: 1.4;
      margin-top: -3px;
    }
  `

  const CartLineItemTitleWrapperCSS = css`
    display: flex;
    flex-direction: column;
  `

  return (
    <Link
      payload={lineItem.merchandise}
      type="products"
      classNames="wps-cart-lineitem-title-link"
      target={settings.lineitemsLinkTarget}
      manualLink={manualLink}
    >
      <div css={CartLineItemTitleWrapperCSS}>
        <span
          className="wps-cart-lineitem-title-content"
          css={CartLineItemTitleCSS}
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
