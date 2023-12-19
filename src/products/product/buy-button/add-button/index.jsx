/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { mq, getMaxQuantity } from "@shopwp/common"
import { useProductState } from "../../_state/hooks"
import { useSettingsState } from "../../../../items/_state/settings/hooks"
import { useProductBuyButtonState } from "../_state/hooks"
import AddButtonWrapper from "./wrapper"
import AddButton from "./button"

const Quantity = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Quantity-public' */ "../../../../quantity")
)

const ProductBuyButtonLeftInStock = wp.element.lazy(() =>
  import(
    /* webpackChunkName: 'ProductBuyButtonLeftInStock-public' */ "../left-in-stock"
  )
)

import Notice from "../../../../notice"

function ProductAddButton({
  hasLink,
  linkTarget,
  linkTo,
  linkWithBuyButton,
  addToCartButtonColor,
  addToCartButtonTextColor,
  isDirectCheckout,
  hasManyVariants,
  productDispatch,
  addedToCart,
  quantity,
  selectedOptions,
  shouldShowQuantity,
}) {
  const settings = useSettingsState()
  const productState = useProductState()
  const [notice, setNotice] = wp.element.useState(false)

  const productBuyButtonState = useProductBuyButtonState()

  const AddButtonWrapperCSS = css`
    display: ${shouldShowQuantity ? "flex" : "block"};
    align-items: flex-start;
    flex-wrap: wrap;
    margin-top: 15px;

    .wps-quantity-container {
      margin-right: 10px;
      margin-bottom: 10px;
    }

    ${mq("medium")} {
      flex-direction: column;

      .wps-quantity-container {
        margin-bottom: 10px;
      }
    }
  `

  function onQuantityChange(newQuantity) {
    productDispatch({ type: "UPDATE_QUANTITY", payload: newQuantity })
  }

  return (
    <div
      className="swp-component-buy-button wps-component wps-component-products-add-button wps-btn-wrapper"
      aria-label={productState.payload.title + " add button"}
    >
      <div css={AddButtonWrapperCSS}>
        {shouldShowQuantity ? (
          <Quantity
            dispatch={productDispatch}
            onChange={onQuantityChange}
            quantityStep={settings.quantityStep}
            fontSize={settings.addToCartButtonTypeFontSize}
            selectedVariant={productState.selectedVariant}
            element={productState.element}
            maxQuantity={getMaxQuantity(
              settings.showInventoryLevels,
              settings.maxQuantity,
              productState.selectedVariant
            )}
            minQuantity={settings.minQuantity}
            initialQuantity={
              settings.minQuantity > 1 ? settings.minQuantity : 1
            }
            globalMaxQuantity={shopwp.cart.maxQuantity}
            small={false}
            setNotice={setNotice}
            selectedOptions={productBuyButtonState.selectedOptions}
          />
        ) : null}
        <AddButtonWrapper
          hasLink={hasLink}
          linkTarget={linkTarget}
          linkTo={linkTo}
          linkWithBuyButton={linkWithBuyButton}
          isDirectCheckout={isDirectCheckout}
          payload={productState.payload}
        >
          <AddButton
            hasLink={hasLink}
            linkWithBuyButton={linkWithBuyButton}
            addToCartButtonColor={addToCartButtonColor}
            addToCartButtonTextColor={addToCartButtonTextColor}
            isDirectCheckout={isDirectCheckout}
            hasManyVariants={hasManyVariants}
            addedToCart={addedToCart}
            quantity={quantity}
            selectedOptions={selectedOptions}
            linkTo={linkTo}
          />
        </AddButtonWrapper>
      </div>
      {notice ? <Notice status="warning">{notice}</Notice> : null}
      {settings.showInventoryLevels &&
      productState.payload.availableForSale &&
      productState.payload.totalInventory ? (
        <ProductBuyButtonLeftInStock />
      ) : null}
    </div>
  )
}

export default ProductAddButton
