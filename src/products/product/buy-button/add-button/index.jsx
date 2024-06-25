/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { FilterHook, getMaxQuantity } from "@shopwp/common"
import { useShopState } from "@shopwp/components"
import { useProductState } from "../../_state/hooks"
import { useSettingsState } from "../../../../items/_state/settings/hooks"
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
  const shopState = useShopState()

  const maxQu = getMaxQuantity(
    settings.showInventoryLevels,
    settings.maxQuantity,
    productState.selectedVariant
  )

  const AddButtonWrapperCSS = css``

  function onQuantityChange(newQuantity) {
    productDispatch({ type: "UPDATE_QUANTITY", payload: newQuantity })
  }

  return (
    <div
      className="swp-component-buy-button wps-component wps-component-products-add-button wps-btn-wrapper"
      aria-label={productState.payload.title + " add button"}
    >
      <div
        className="swp-add-to-cart-wrapper swp-mt10"
        css={AddButtonWrapperCSS}
        data-should-show-quantity={shouldShowQuantity}
        data-should-link-to={linkTo}
      >
        <div className="swp-add-to-cart-inner swp-l-row swp-l-col-start">
          {shouldShowQuantity ? (
            <Quantity
              dispatch={productDispatch}
              onChange={onQuantityChange}
              quantityStep={settings.quantityStep}
              fontSize={settings.addToCartButtonTypeFontSize}
              selectedVariant={productState.selectedVariant}
              element={productState.element}
              maxQuantity={maxQu}
              minQuantity={settings.minQuantity}
              initialQuantity={
                settings.minQuantity > 1 ? settings.minQuantity : 1
              }
              globalMaxQuantity={shopwp.cart.maxQuantity}
              small={false}
              setNotice={setNotice}
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
              isDirectCheckout={isDirectCheckout}
              hasManyVariants={hasManyVariants}
              addedToCart={addedToCart}
              quantity={quantity}
              selectedOptions={selectedOptions}
              linkTo={linkTo}
            />
          </AddButtonWrapper>
        </div>
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
