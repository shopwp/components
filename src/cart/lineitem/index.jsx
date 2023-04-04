/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import {
  containerFluidCSS,
  flexRowCSS,
  flexColSmallCSS,
  mq,
} from "@shopwp/common"
import { FilterHook, shouldShowSaleNotice } from "@shopwp/common"
import { useCartState } from "@shopwp/components"
import { useShopState } from "@shopwp/components"

const Notice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notice-public' */ "../../notice")
)

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

const CartLineItemOutOfStock = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'CartLineItemOutOfStock-public' */ "./out-of-stock"
  )
)

function CartLineItem({ lineItem }) {
  const { useState, useRef } = wp.element
  const cartState = useCartState()
  const [isUpdating] = useState(() => false)
  const [notice, setNotice] = useState(false)
  const lineItemTotal = lineItem.cost.totalAmount.amount
  const [subscriptionDiscount, setSubscriptionDiscount] = useState(false)
  const shopState = useShopState()
  const lineItemElement = useRef()
  const showingSaleNotice = shouldShowSaleNotice(lineItem)

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

  const lineItemStyles = css`
    margin-top: 0;
    min-height: 100px;
    position: relative;
    display: flex;
    flex-direction: column;

    .wps-cart-lineitem-img-link {
      align-self: flex-start;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 0.7;
      }
    }

    [class*="noticeStyles"] {
      font-size: 13px;
      margin-top: 10px;
    }
  `

  const lineItemInner = css`
    margin: 0;
    display: flex;
  `

  const lineItemTitle = css`
    color: #313131;
    text-decoration: none;
    font-size: 16px;
    position: relative;
    margin: 0;

    &[data-wps-is-empty="true"] {
      margin-bottom: 1em;
    }

    &:hover {
      color: #313131;
    }
  `

  const cartLineItemContentCSS = css`
    margin-top: 0;
    flex: 1;
    padding-left: 10px;
    padding-bottom: 5px;

    ${mq("small")} {
      padding-bottom: 15px;

      .col-8 {
        flex: 0 0 100%;
        max-width: 100%;
      }
    }
  `

  const lineItemQuantityWrapperCSS = css`
    position: relative;
    flex-wrap: wrap;
  `

  return (
    <div
      className="wps-cart-lineitem"
      data-wps-is-updating={isUpdating}
      data-wps-is-available={lineItem.merchandise.availableForSale}
      ref={lineItemElement}
      css={lineItemStyles}
    >
      <div css={lineItemInner}>
        <CartLineItemImage lineItem={lineItem} settings={cartState.settings} />

        <div className="wps-cart-lineitem-content" css={cartLineItemContentCSS}>
          <FilterHook
            name="before.lineItemTitle"
            args={[cartState, lineItem]}
          />

          <div
            css={lineItemTitle}
            className="wps-cart-lineitem-title"
            data-wps-is-empty={hasRealVariant() ? "false" : "true"}
          >
            <div
              className="wps-cart-lineitem-title-wrapper"
              css={containerFluidCSS}
            >
              <div css={flexRowCSS}>
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
            <CartLineItemOutOfStock
              noticeUnavailableText={cartState.settings.noticeUnavailableText}
            />
          ) : (
            <div
              className="wps-cart-lineitem-quantity-wrapper"
              css={containerFluidCSS}
            >
              <div
                css={[flexRowCSS, flexColSmallCSS, lineItemQuantityWrapperCSS]}
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
                />

                {cartState.settings.showInventoryLevels &&
                lineItem.merchandise.quantityAvailable >= 1 &&
                lineItem.merchandise.availableForSale &&
                cartState.settings.leftInStockThreshold >=
                  lineItem.merchandise.quantityAvailable ? (
                  <CartLineItemLeftInStock lineItem={lineItem} />
                ) : null}
              </div>

              {lineItem.attributes.length ? (
                <CartAttributes lineItem={lineItem} />
              ) : null}
            </div>
          )}
        </div>
      </div>
      {notice ? <Notice status={notice.type}>{notice.message}</Notice> : null}
    </div>
  )
}

export default CartLineItem
