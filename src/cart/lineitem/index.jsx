/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import {
  FilterHook,
  containerFluidCSS,
  findPercentageDiff,
} from "@shopwp/common"
import { useCartState, useShopState, Price } from "@shopwp/components"

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
  const [showingBreakdowns, setShowingBreakdowns] = useState(false)

  const [subscriptionDiscount] = useState(false)
  const shopState = useShopState()
  const lineItemElement = useRef()

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

  const regPrice = lineItem.cost.totalAmount
    ? lineItem.cost.totalAmount.amount
    : false

  const salePrice = lineItem.discountAllocations.length
    ? lineItem.cost.subtotalAmount.amount
    : false
  // const salePrice = false

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

  function toggleBreakdowns() {
    setShowingBreakdowns(!showingBreakdowns)
  }

  function onHandleKeyDown(e) {
    if (e.key === "Enter") {
      toggleBreakdowns()
    }
  }

  return (
    <li
      className="swp-cart-lineitem swp-mb30 wps-cart-lineitem"
      data-wps-is-updating={isUpdating}
      data-wps-is-available={lineItem.merchandise.availableForSale}
      ref={lineItemElement}
      css={lineItemStyles}
      role="listitem"
    >
      <div className="swp-cart-lineitem-inner" css={lineItemInner}>
        <span className="swp-lineitem-quantity-label">{lineItem.quantity}</span>

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

          <div className="swp-l-row swp-m-l-row">
            {hasRealVariant() ? (
              <CartLineItemVariantTitle lineItem={lineItem} />
            ) : null}
          </div>

          {!lineItem.merchandise.availableForSale ? (
            <Notice status="warning">
              {cartState.settings.noticeUnavailableText}
            </Notice>
          ) : (
            <>
              <div
                className="swp-l-rel100 swp-mt15 swp-cart-lineitem-quantity-wrapper"
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
                    salePrice={salePrice}
                    regPrice={regPrice}
                    subscriptionDiscount={subscriptionDiscount}
                  />
                </div>

                <div className="swp-lineitem-pricing">
                  <p
                    className="swp-lineitem-view-price-breakdowns"
                    onClick={toggleBreakdowns}
                    onKeyDown={onHandleKeyDown}
                    tabIndex="0"
                  >
                    {showingBreakdowns ? (
                      <svg
                        xmlSpace="preserve"
                        width="10"
                        height="10"
                        viewBox="0 0 459.313 459.314"
                      >
                        <path d="M459.313 229.648c0 22.201-17.992 40.199-40.205 40.199H40.181c-11.094 0-21.14-4.498-28.416-11.774C4.495 250.808 0 240.76 0 229.66c-.006-22.204 17.992-40.199 40.202-40.193h378.936c22.195.005 40.17 17.989 40.175 40.181z" />
                      </svg>
                    ) : (
                      <svg
                        xmlSpace="preserve"
                        width="10"
                        height="10"
                        viewBox="0 0 45.402 45.402"
                      >
                        <path d="M41.267 18.557H26.832V4.134A4.127 4.127 0 0 0 22.707 0a4.126 4.126 0 0 0-4.124 4.135v14.432H4.141a4.137 4.137 0 0 0-4.138 4.135 4.143 4.143 0 0 0 1.207 2.934 4.122 4.122 0 0 0 2.92 1.222h14.453V41.27c0 1.142.453 2.176 1.201 2.922a4.11 4.11 0 0 0 2.919 1.211 4.13 4.13 0 0 0 4.129-4.133V26.857h14.435c2.283 0 4.134-1.867 4.133-4.15-.001-2.282-1.852-4.15-4.133-4.15z" />
                      </svg>
                    )}
                    View price breakdown
                  </p>
                  {showingBreakdowns ? (
                    <div className="swp-lineitem-price-breakdowns">
                      <p className="swp-l-row swp-m-l-row swp-l-row-between swp-lineitem-price-breakdown">
                        <span className="swp-lineitem-price-breakdown-label">
                          Price per item:
                        </span>
                        <span className="swp-l-row swp-m-l-row swp-lineitem-price-breakdown-value">
                          {lineItem.cost.compareAtAmountPerQuantity ? (
                            <span className="swp-lineitem-was-price-wrap">
                              {shopState.t.l.was}
                              <span>
                                <Price
                                  price={
                                    lineItem.cost.compareAtAmountPerQuantity
                                      .amount
                                  }
                                />
                              </span>
                            </span>
                          ) : null}
                          <Price
                            price={lineItem.cost.amountPerQuantity.amount}
                          />
                        </span>
                      </p>

                      {lineItem.cost.subtotalAmount.amount !==
                      lineItem.cost.totalAmount.amount ? (
                        <p className="swp-l-row swp-m-l-row swp-l-row-between swp-lineitem-price-breakdown swp-lineitem-price-breakdown-save">
                          <span className="swp-lineitem-price-breakdown-label">
                            {hasDiscounts() ? "Discount: " : "Savings: "}
                          </span>
                          <span className="swp-lineitem-price-breakdown-value">
                            &ndash;
                            {findPercentageDiff(
                              lineItem.cost.totalAmount.amount,
                              lineItem.cost.subtotalAmount.amount
                            )}
                            %
                          </span>
                        </p>
                      ) : null}

                      <p className="swp-l-row swp-m-l-row swp-l-row-between swp-lineitem-price-breakdown">
                        <span className="swp-lineitem-price-breakdown-label">
                          Total cost for {lineItem.quantity}{" "}
                          {lineItem.quantity === 1 ? "item" : "items"}:
                        </span>
                        <span className="swp-lineitem-price-breakdown-value">
                          <Price price={lineItem.cost.totalAmount.amount} />
                        </span>
                      </p>
                    </div>
                  ) : null}
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
                  <CartAttributes
                    attributes={lineItem.attributes}
                    cartData={shopState.cartData}
                  />
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </li>
  )
}

export default CartLineItem
