import { onlyAvailableOptionsFromVariants } from "@shopwp/common"
import {
  findVariantFromSelectedOptions,
  allOptionsSelectedMatch,
  FilterHook,
  isHidingControls,
  shouldShowQuantity,
} from "@shopwp/common"

import isEmpty from "lodash-es/isEmpty"

import {
  useProductBuyButtonState,
  useProductBuyButtonDispatch,
} from "../_state/hooks"

import ProductAddButton from "../add-button"
import ProductOptions from "../options"
import SubscriptionsBuyButton from "../subscriptions"
import { useSettingsState } from "../../../../items/_state/settings/hooks"
import { useProductState, useProductDispatch } from "../../_state/hooks"
import { useShopState } from "@shopwp/components"

function shouldShowSubscriptions(payload, settings) {
  var sellingPlanGroups = payload.sellingPlanGroups

  if (sellingPlanGroups.edges.length) {
    var hasSellingPlans = true
  } else {
    var hasSellingPlans = false
  }

  return settings.subscriptions && hasSellingPlans
}

function ProductBuyButtonWrapper() {
  const settings = useSettingsState()
  const productState = useProductState()
  const productDispatch = useProductDispatch()
  const productBuyButtonState = useProductBuyButtonState()
  const productBuyButtonDispatch = useProductBuyButtonDispatch()
  const shopState = useShopState()
  const { useState, useEffect, Suspense } = wp.element
  const isDirectCheckout =
    settings.directCheckout || shopwp.general.directCheckout

  const [showSubscriptions, setShowSubscriptions] = useState(
    shouldShowSubscriptions(productState.payload, settings)
  )

  function shouldShowOptions() {
    return productState.hasManyVariants && !isHidingControls(settings)
  }

  var availableOptions = onlyAvailableOptionsFromVariants(
    productState.payload.variants,
    settings.showOutOfStockVariants
  )

  useEffect(() => {
    var foundVariant = findVariantFromSelectedOptions(
      productState.payload.variants,
      productBuyButtonState.selectedOptions
    )

    if (foundVariant) {
      productDispatch({
        type: "SET_SELECTED_VARIANT",
        payload: foundVariant.node,
      })

      wp.hooks.doAction("on.beforeAddToCart", productState)

      if (!foundVariant.node.availableForSale) {
        productBuyButtonDispatch({
          type: "SET_NOTICE",
          payload: {
            type: "warning",
            message: shopState.t.l.outOfStock,
          },
        })
      } else {
        productBuyButtonDispatch({
          type: "SET_NOTICE",
          payload: false,
        })
      }
    } else {
      if (
        allOptionsSelectedMatch(
          productBuyButtonState.selectedOptions,
          productState.payload
        )
      ) {
        productBuyButtonDispatch({
          type: "SET_NOTICE",
          payload: {
            type: "warning",
            message: settings.variantNotAvailableText,
          },
        })
      } else {
        productBuyButtonDispatch({
          type: "SET_NOTICE",
          payload: false,
        })
      }
    }

    setShowSubscriptions(
      shouldShowSubscriptions(productState.payload, settings)
    )
  }, [
    productBuyButtonState.selectedOptions,
    productDispatch,
    productState.payload,
    settings.subscriptions,
  ])

  return (
    <Suspense fallback="Loading buy button ...">
      {shouldShowOptions() && (
        <ProductOptions
          missingSelections={productState.missingSelections}
          variantStyle={settings.variantStyle}
          selectedOptions={productBuyButtonState.selectedOptions}
          hasSelections={!isEmpty(productBuyButtonState.selectedOptions)}
          availableOptions={availableOptions}
          productDispatch={productDispatch}
          isDirectCheckoutOut={productState.isDirectCheckingOut}
          selectFirstVariant={productState.selectFirstVariant}
          selectedVariant={productState.selectedVariant}
        />
      )}

      {showSubscriptions && !isHidingControls(settings) ? (
        <SubscriptionsBuyButton
          payload={productState.payload}
          settings={settings}
        />
      ) : null}

      <FilterHook name="before.productActionButton" args={[productState]} />

      <ProductAddButton
        shouldShowQuantity={shouldShowQuantity(settings, productState.payload)}
        addedToCart={productState.addedToCart}
        hasLink={productState.hasLink}
        linkTarget={settings.linkTarget}
        linkTo={settings.linkTo}
        linkWithBuyButton={settings.linkWithBuyButton}
        isDirectCheckout={isDirectCheckout}
        hasManyVariants={productState.hasManyVariants}
        productDispatch={productDispatch}
        quantity={productState.quantity}
        selectedOptions={productBuyButtonState.selectedOptions}
      />
    </Suspense>
  )
}

export default ProductBuyButtonWrapper
