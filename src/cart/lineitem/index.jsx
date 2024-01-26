/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import {
  FilterHook,
  shouldShowSaleNotice,
  containerFluidCSS,
} from "@shopwp/common"
import { useCartState, useShopState } from "@shopwp/components"

import Notice from "../../notice"

const CartLineItemPrice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartLineItemPrice-public' */ "./price")
)

const CartAttributes = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartAttributes-public' */ "./attributes")
)

const CartLineItemVariantTitle = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'CartLineItemVariantTitle-public' */ "./variant-title"
  )
)

const CartLineItemQuantity = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartLineItemQuantity-public' */ "./quantity")
)

const CartLineItemTitle = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartLineItemTitle-public' */ "./title")
)

const CartLineItemRemove = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartLineItemRemove-public' */ "./remove")
)

const CartLineItemImage = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartLineItemImage-public' */ "./image")
)

const CartLineItemLeftInStock = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'CartLineItemLeftInStock-public' */ "./left-in-stock"
  )
)

const CartLineItemDiscounts = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartLineItemDiscounts-public' */ "./discounts")
)

function CartLineItem({ lineItem }) {
  const { useState, useRef } = wp.element
  const cartState = useCartState()
  const [isUpdating] = useState(() => false)
  const [noticeMessage, setNotice] = useState(false)

  const [subscriptionDiscount, setSubscriptionDiscount] = useState(false)
  const shopState = useShopState()
  const lineItemElement = useRef()
  const showingSaleNotice = shouldShowSaleNotice(lineItem)

  function findLineItemPrice() {
    if (
      !shopState.cartData.discountAllocations ||
      shopState.cartData.discountAllocations.length === 0
    ) {
      return lineItem.cost.totalAmount.amount
    }

    var regPrice = parseFloat(lineItem.cost.totalAmount.amount)

    var finalDiscountAmount = shopState.cartData.discountAllocations.reduce(
      (accumulator, currentValue) =>
        accumulator + parseFloat(currentValue.discountedAmount.amount),
      0
    )

    var adjusted = regPrice - finalDiscountAmount

    if (adjusted < 0) {
      return 0
    }

    return adjusted
  }

  const lineItemTotal = findLineItemPrice()

  const regPrice = calcPrice(
    lineItem.quantity,
    lineItem.merchandise.price.amount
  )

  const salePrice = calcPrice(
    lineItem.quantity,
    lineItem.merchandise?.compareAtPrice
      ? lineItem.merchandise.compareAtPrice.amount
      : false
  )

  function calcPrice(lineItemQuantity, price) {
    if (price === false) {
      return false
    }

    return parseFloat(price) * parseFloat(lineItemQuantity)
  }

  function hasRealVariant() {
    return lineItem.merchandise.title !== shopState.t.l.defaultTitle
  }

  const lineItemStyles = css``
  const lineItemInner = css``
  const lineItemTitle = css``
  const cartLineItemContentCSS = css``
  const lineItemQuantityWrapperCSS = css``

  function hasDiscounts() {
    if (!lineItem.discountAllocations || !lineItem.discountAllocations.length) {
      return false
    }
    return true
  }

  return (
    <li
      className="swp-cart-lineitem swp-mb20 wps-cart-lineitem"
      data-wps-is-updating={isUpdating}
      data-wps-is-available={lineItem.merchandise.availableForSale}
      ref={lineItemElement}
      css={lineItemStyles}
      role="listitem"
    >
      <div className="swp-cart-lineitem-inner" css={lineItemInner}>
        <CartLineItemImage lineItem={lineItem} settings={cartState.settings} />

        <div
          className="swp-cart-lineitem-content wps-cart-lineitem-content"
          css={cartLineItemContentCSS}
        >
          <FilterHook
            name="before.lineItemTitle"
            args={[cartState, lineItem]}
          />

          <div
            css={lineItemTitle}
            className="swp-cart-lineitem-title-wrap wps-cart-lineitem-title"
            data-wps-is-empty={hasRealVariant() ? "false" : "true"}
          >
            <div
              className="wps-cart-lineitem-title-wrapper"
              css={containerFluidCSS}
            >
              <div className="swp-l-row">
                <CartLineItemTitle
                  lineItem={lineItem}
                  settings={cartState.settings}
                />
                <CartLineItemRemove lineItem={lineItem} />
              </div>
            </div>
          </div>

          <FilterHook name="after.lineItemTitle" args={[cartState, lineItem]} />

          {hasRealVariant() && <CartLineItemVariantTitle lineItem={lineItem} />}

          {!lineItem.merchandise.availableForSale ? (
            <Notice status="warning">
              {cartState.settings.noticeUnavailableText}
            </Notice>
          ) : (
            <>
              <div
                className="swp-l-rel100 wps-cart-lineitem-quantity-wrapper"
                css={containerFluidCSS}
              >
                <div
                  className="swp-l-row swp-m-l-row swp-cart-lineitem-quantity-inner"
                  css={lineItemQuantityWrapperCSS}
                >
                  <CartLineItemQuantity
                    lineItem={lineItem}
                    setNotice={setNotice}
                  />
                  <CartLineItemPrice
                    showingSaleNotice={showingSaleNotice}
                    lineItemTotal={lineItemTotal}
                    salePrice={salePrice}
                    regPrice={regPrice}
                    subscriptionDiscount={subscriptionDiscount}
                    discounts={shopState.cartData.discountAllocations}
                    shopState={shopState}
                  />
                </div>

                {noticeMessage ? (
                  <Notice status="warning">{noticeMessage}</Notice>
                ) : null}
                {cartState.settings.showInventoryLevels &&
                lineItem.merchandise.quantityAvailable >= 1 &&
                lineItem.merchandise.availableForSale &&
                cartState.settings.leftInStockThreshold >=
                  lineItem.merchandise.quantityAvailable ? (
                  <CartLineItemLeftInStock />
                ) : null}

                {lineItem.attributes.length ? (
                  <CartAttributes lineItem={lineItem} />
                ) : null}
              </div>

              {hasDiscounts() ? (
                <CartLineItemDiscounts lineItem={lineItem} />
              ) : null}
            </>
          )}
        </div>
      </div>
    </li>
  )
}

export default CartLineItem
