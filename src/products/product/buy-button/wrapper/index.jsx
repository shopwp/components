import { onlyAvailableOptionsFromVariants } from "@shopwp/common"
import {
  findVariantFromSelectedOptions,
  allOptionsSelectedMatch,
  FilterHook,
} from "@shopwp/common"

import isEmpty from "lodash-es/isEmpty"

import {
  useProductBuyButtonState,
  useProductBuyButtonDispatch,
} from "../_state/hooks"

import ProductAddButton from "../add-button"
import ProductOptions from "../options"
import SubscriptionsBuyButton from "../subscriptions"
import { useAction } from "@shopwp/hooks"
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

  return shopwp.misc.hasRecharge && settings.subscriptions && hasSellingPlans
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

  const selectVariant = useAction("do.selectVariant")

  const [showSubscriptions, setShowSubscriptions] = useState(
    shouldShowSubscriptions(productState.payload, settings)
  )

  function isHidingControls() {
    if (settings.variantId) {
      return true
    }

    if (settings.linkTo === "none") {
      return false
    }

    if ((settings.isSingular && settings.postId) || isDirectCheckout) {
      return false
    }

    if (
      settings.linkTo === "shopify" ||
      settings.linkTo === "wordpress" ||
      settings.linkTo === "modal"
    ) {
      if (settings.linkWithBuyButton) {
        return false
      }

      return true
    }

    return false
  }

  function shouldShowOptions() {
    return productState.hasManyVariants && !isHidingControls()
  }

  function shouldShowQuantity() {
    if (settings.hideQuantity) {
      return false
    }

    if (settings.variantId) {
      return true
    }

    return !isHidingControls()
  }

  var availableOptions = onlyAvailableOptionsFromVariants(
    productState.payload.variants,
    settings.showOutOfStockVariants
  )

  useEffect(() => {
    var foundVariant = findVariantFromSelectedOptions(
      productState.payload,
      productBuyButtonState.selectedOptions
    )

    if (foundVariant) {
      productDispatch({
        type: "SET_SELECTED_VARIANT",
        payload: foundVariant,
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
      productDispatch({
        type: "SET_SELECTED_VARIANT",
        payload: false,
      })

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

      {showSubscriptions ? (
        <SubscriptionsBuyButton
          payload={productState.payload}
          settings={settings}
        />
      ) : null}

      <FilterHook name="before.productActionButton" args={[productState]} />

      <ProductAddButton
        shouldShowQuantity={shouldShowQuantity()}
        addedToCart={productState.addedToCart}
        hasLink={productState.hasLink}
        linkTarget={settings.linkTarget}
        linkTo={settings.linkTo}
        linkWithBuyButton={settings.linkWithBuyButton}
        addToCartButtonColor={settings.addToCartButtonColor}
        addToCartButtonTextColor={settings.addToCartButtonTextColor}
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
