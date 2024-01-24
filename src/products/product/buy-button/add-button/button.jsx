/** @jsx jsx */
import { jsx, css } from "@emotion/react"
import { useProductState, useProductDispatch } from "../../_state/hooks"
import { useShopState } from "../../../../shop/_state/hooks"
import { useSettingsState } from "../../../../items/_state/settings/hooks"
import {
  findVariantFromSelectedOptions,
  findVariantByVariantId,
  allOptionsSelectedMatch,
} from "@shopwp/common"
import { to, createCheckoutUrl } from "@shopwp/common"
import {
  useProductBuyButtonState,
  useProductBuyButtonDispatch,
} from "../_state/hooks"

import { directCheckout } from "../../../../cart/api.jsx"

const AddButtonText = wp.element.lazy(() =>
  import(/* webpackChunkName: 'AddButtonText-public' */ "./text")
)

const Notice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notice-public' */ "../../../../notice")
)

import Loader from "../../../../loader"

function findSingleVariantFromPayload(payload) {
  if (!payload.variants.edges.length) {
    return false
  }

  return payload.variants.edges[0]
}

function buildLines(variant, quantity, productBuyButtonState) {
  var customAttrs = wp.hooks.applyFilters(
    "cart.lineItemAttributes",
    [],
    variant,
    quantity,
    productBuyButtonState
  )

  const data = {
    attributes: customAttrs,
    merchandiseId: variant.node.id,
    quantity: quantity,
  }

  if (productBuyButtonState?.subscription) {
    data["sellingPlanId"] = productBuyButtonState.subscription.sellingPlanId
  }

  return [data]
}

function AddButton({
  addToCartButtonColor,
  addToCartButtonTextColor,
  hasLink,
  linkWithBuyButton,
  isDirectCheckout,
  hasManyVariants,
  addedToCart,
  quantity,
  selectedOptions,
  linkTo,
}) {
  const { useRef, useEffect, useState } = wp.element

  const productBuyButtonState = useProductBuyButtonState()
  const productBuyButtonDispatch = useProductBuyButtonDispatch()
  const productState = useProductState()
  const productDispatch = useProductDispatch()
  const settings = useSettingsState()
  const shopState = useShopState()
  const [shouldShake, setShouldShake] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const button = useRef()

  function findVariant() {
    if (settings.variantId) {
      return findVariantByVariantId(productState.payload, settings.variantId)
    }

    if (hasManyVariants) {
      return findVariantFromSelectedOptions(
        productState.payload,
        selectedOptions
      )
    } else {
      return findSingleVariantFromPayload(productState.payload)
    }
  }

  var variant = findVariant()

  const buttonCSS = css``

  const NoticeCSS = css`
    margin-top: 15px;
    width: 100%;
  `

  const addToCartCSS = css`
    font-family: ${settings.addToCartButtonTypeFontFamily
      ? settings.addToCartButtonTypeFontFamily
      : "inherit"};
    font-weight: ${settings.addToCartButtonTypeFontWeight
      ? settings.addToCartButtonTypeFontWeight
      : "initial"};
    font-style: ${settings.addToCartButtonTypeFontStyle
      ? settings.addToCartButtonTypeFontStyle
      : "initial"};
    font-size: ${settings.addToCartButtonTypeFontSize
      ? settings.addToCartButtonTypeFontSize
      : "initial"} !important;
    letter-spacing: ${settings.addToCartButtonTypeLetterSpacing
      ? settings.addToCartButtonTypeLetterSpacing
      : "initial"};
    line-height: ${settings.addToCartButtonTypeLineHeight
      ? settings.addToCartButtonTypeLineHeight
      : 1} !important;
    text-decoration: ${settings.addToCartButtonTypeTextDecoration
      ? settings.addToCartButtonTypeTextDecoration
      : "initial"};
    text-transform: ${settings.addToCartButtonTypeTextTransform
      ? settings.addToCartButtonTypeTextTransform
      : "initial"};
    overflow-y: hidden;
    min-height: 45px;
    width: 100%;
    max-width: auto;
    min-width: auto;
    flex: 1;
    border-radius: ${settings.globalBorderRadius};

    animation: ${shouldShake && !isCheckingOut
      ? "swpShake 0.9s ease-in-out"
      : "none"};

    &:hover {
      text-decoration: none;
      cursor: ${isCheckingOut || isDisabled ? "not-allowed" : "pointer"};

      .swp-add-to-cart-text {
        opacity: 0.7;
      }
    }

    && {
      background-color: ${isDisabled ? "#cfcfcf" : addToCartButtonColor};
    }
  `

  async function handleClick(e) {
    if (linkTo === "modal" && !linkWithBuyButton) {
      productDispatch({ type: "TOGGLE_MODAL", payload: true })
      return
    }

    if (hasLink && !linkWithBuyButton) {
      return
    }

    e.preventDefault()

    // check if all options are selected
    // if some are not selected, highlight them / shake them
    if (!variant && hasManyVariants) {
      productDispatch({ type: "SET_MISSING_SELECTIONS", payload: true })
      return
    }

    if (!variant) {
      // TODO: Handle this better
      console.error("ShopWP error: handleClick variant undefined ")

      productDispatch({ type: "SET_MISSING_SELECTIONS", payload: true })
      productBuyButtonDispatch({
        type: "UPDATE_SELECTED_OPTIONS",
        payload: false,
      })
      return
    }

    const lines = buildLines(variant, quantity, productBuyButtonState)

    if (
      shopwp.cart.maxQuantity &&
      shopState.cartData.totalQuantity + quantity > shopwp.cart.maxQuantity
    ) {
      productBuyButtonDispatch({
        type: "SET_NOTICE",
        payload: {
          type: "error",
          message: shopState.t.w.maxCartTotal,
        },
      })

      return
    }

    if (settings.variantId) {
      wp.hooks.doAction("do.addToCart", {
        lines: lines,
        extras: {
          openCartAfterAdding: settings.openCartAfterAdding,
        },
      })
      return
    }

    if (
      productState.payload.requiresSellingPlan &&
      !productBuyButtonState.subscription
    ) {
      productBuyButtonDispatch({
        type: "SET_NOTICE",
        payload: {
          type: "error",
          message: shopState.t.e.requireSub,
        },
      })
      return
    }

    productDispatch({ type: "SET_ADDED_VARIANT", payload: variant.node })

    if (settings.resetVariantsAfterAdding) {
      productDispatch({ type: "SET_SELECTED_VARIANT", payload: false })

      productBuyButtonDispatch({
        type: "UPDATE_SELECTED_OPTIONS",
        payload: false,
      })
    }

    productDispatch({ type: "SET_MISSING_SELECTIONS", payload: false })
    productDispatch({ type: "SET_NOTICE", payload: false })

    wp.hooks.doAction("do.addToCart", {
      lines: lines,
      extras: {
        openCartAfterAdding: settings.openCartAfterAdding,
      },
    })
  }

  useEffect(() => {
    var allOptionsSelected = allOptionsSelectedMatch(
      selectedOptions,
      productState.payload
    )

    if (!allOptionsSelected) {
      setIsDisabled(false)
      return
    }

    let variantNew = findVariant()

    if (!variantNew) {
      setIsDisabled(true)
      return
    }

    if (variantNew.node.availableForSale) {
      setShouldShake(true)
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [selectedOptions])

  useEffect(() => {
    if (!shopState.directCheckoutError) {
      return
    }
    setIsCheckingOut(false)
    productBuyButtonDispatch({
      type: "SET_NOTICE",
      payload: {
        type: "error",
        message: shopState.directCheckoutError,
      },
    })
  }, [shopState.directCheckoutError])

  return (
    <>
      {isDirectCheckout ? (
        <DirectCheckoutButton
          shopState={shopState}
          isDisabled={isDisabled}
          addedToCart={addedToCart}
          addToCartButtonTextColor={addToCartButtonTextColor}
          productBuyButtonState={productBuyButtonState}
          productBuyButtonDispatch={productBuyButtonDispatch}
          settings={settings}
          productState={productState}
          productDispatch={productDispatch}
          quantity={quantity}
          variant={variant}
          hasManyVariants={hasManyVariants}
        />
      ) : (
        <button
          ref={button}
          type="button"
          role="button"
          itemProp="potentialAction"
          itemScope
          itemType="https://schema.org/BuyAction"
          className="swp-btn wps-btn wps-btn-secondary wps-add-to-cart"
          data-wps-is-direct-checkout={isDirectCheckout ? "1" : "0"}
          onClick={handleClick}
          css={[buttonCSS, addToCartCSS]}
          disabled={isCheckingOut || isDisabled}
        >
          {isCheckingOut ? (
            <Loader />
          ) : (
            <AddButtonText
              isDisabled={isDisabled}
              addedToCart={addedToCart}
              addToCartButtonTextColor={addToCartButtonTextColor}
              productBuyButtonState={productBuyButtonState}
              settings={settings}
              isDirectCheckout={isDirectCheckout}
              productState={productState}
            />
          )}
        </button>
      )}

      {productBuyButtonState.notice ? (
        <Notice status={productBuyButtonState.notice.type} extraCSS={NoticeCSS}>
          {productBuyButtonState.notice.message}
        </Notice>
      ) : null}
    </>
  )
}

function DirectCheckoutButton({
  isDisabled,
  addedToCart,
  addToCartButtonTextColor,
  settings,
  productState,
  shopState,
  variant,
  quantity,
  productBuyButtonState,
  productDispatch,
  hasManyVariants,
  productBuyButtonDispatch,
}) {
  const { useState } = wp.element

  const [checkoutLink, setCheckoutLink] = useState(undefined)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const buttonCSS = css``

  var shouldDisable = false

  function onCheckout(e) {
    if (!variant && hasManyVariants) {
      productDispatch({ type: "SET_MISSING_SELECTIONS", payload: true })
      return
    }

    if (!variant) {
      console.error("ShopWP error: handleClick variant undefined ")

      productDispatch({ type: "SET_MISSING_SELECTIONS", payload: true })
      productBuyButtonDispatch({
        type: "UPDATE_SELECTED_OPTIONS",
        payload: false,
      })

      return
    }

    if (shouldDisable) {
      return
    }

    if (settings.linkTarget === "_self") {
      setIsCheckingOut(true)
    }

    const lines = buildLines(variant, quantity, productBuyButtonState)

    var checkoutData = {
      lines: lines,
      note: false,
      discountCode: false,
      customAttributes: false,
      settings: settings,
    }

    productDispatch({ type: "SET_IS_DIRECT_CHECKOUT", payload: true })

    createCartAndCheckoutUrl(checkoutData, shopState)
  }

  async function createCartAndCheckoutUrl(checkoutData, shopState) {
    const [error, resp] = await to(directCheckout(checkoutData, shopState))

    if (error) {
      setIsCheckingOut(false)
      productDispatch({ type: "SET_IS_DIRECT_CHECKOUT", payload: false })

      productBuyButtonDispatch({
        type: "SET_NOTICE",
        payload: {
          type: "error",
          message: JSON.stringify(error),
        },
      })
      return
    }

    if (resp) {
      var finalUrl = createCheckoutUrl({
        checkoutUrl: resp.checkoutUrl,
        trackingParams: shopState.trackingParams,
        target: shopwp.misc.isMobile
          ? "_self"
          : shopwp.general.checkoutButtonTarget,
      })

      setCheckoutLink(finalUrl)
    }
  }

  return isCheckingOut && checkoutLink ? (
    <AutoClickLink href={checkoutLink} />
  ) : (
    <div
      className="swp-btn swp-l-flex swp-btn swp-btn-direct-checkout"
      onClick={onCheckout}
      css={[buttonCSS]}
      data-is-disabled={isCheckingOut || isDisabled}
    >
      {isCheckingOut ? (
        <Loader />
      ) : (
        <AddButtonText
          isDisabled={isDisabled}
          addedToCart={addedToCart}
          addToCartButtonTextColor={addToCartButtonTextColor}
          productBuyButtonState={productBuyButtonState}
          settings={settings}
          productState={productState}
          isDirectCheckout={true}
        />
      )}
    </div>
  )
}

function AutoClickLink({ href }) {
  const { useEffect, useRef } = wp.element
  const linkBtn = useRef()

  useEffect(() => {
    linkBtn.current.click()
  }, [])

  return (
    <a
      ref={linkBtn}
      href={href}
      className="swp-btn swp-l-flex swp-btn-direct-checkout-linker"
      target={
        shopwp.misc.isMobile ? "_self" : shopwp.general.checkoutButtonTarget
      }
      data-is-disabled={true}
    >
      <Loader />
    </a>
  )
}

export default AddButton
